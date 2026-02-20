import { createContext, useContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDocFromServer, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, googleProvider, db } from "../services/firebase";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Helper: fetch Firestore doc with retries (handles race condition on login popup)
    const fetchUserDoc = async (uid, retries = 4, delayMs = 1000) => {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                const userDocRef = doc(db, "users", uid);
                // getDocFromServer forces a direct server fetch, bypassing local cache
                const userDoc = await getDocFromServer(userDocRef);
                return { ref: userDocRef, doc: userDoc };
            } catch (error) {
                const isOffline = error.code === 'unavailable' || error.message?.includes('offline');
                if (isOffline && attempt < retries) {
                    console.warn(`Firestore offline, retrying in ${delayMs}ms... (attempt ${attempt}/${retries})`);
                    await new Promise(resolve => setTimeout(resolve, delayMs));
                    delayMs *= 2; // exponential backoff: 1s → 2s → 4s → 8s
                } else {
                    throw error;
                }
            }
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const { ref: userDocRef, doc: userDoc } = await fetchUserDoc(currentUser.uid);
                    let userData = {};

                    if (userDoc.exists()) {
                        userData = userDoc.data();
                    } else {
                        // New user — create document
                        userData = {
                            email: currentUser.email,
                            role: 'free',
                            createdAt: serverTimestamp(),
                            displayName: currentUser.displayName,
                            photoURL: currentUser.photoURL,
                        };
                        await setDoc(userDocRef, userData);
                    }

                    setUser({ ...currentUser, role: userData.role || 'free' });
                } catch (error) {
                    console.error("Error fetching user role from Firestore:", error.code, error.message);
                    // Fallback — let user in with 'free' role
                    setUser({ ...currentUser, role: 'free' });
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);


    const loginWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error("Google Login Error:", error);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const value = {
        user,
        loading,
        loginWithGoogle,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
