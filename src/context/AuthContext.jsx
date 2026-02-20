import { createContext, useContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, googleProvider, db } from "../services/firebase";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                console.log("Auth State Changed: User Logged In", currentUser.uid);
                try {
                    const userDocRef = doc(db, "users", currentUser.uid);
                    console.log("Checking Firestore for user document...");
                    const userDoc = await getDoc(userDocRef);
                    let userData = {};

                    if (userDoc.exists()) {
                        console.log("User document found in Firestore.");
                        userData = userDoc.data();
                    } else {
                        console.log("User document NOT found. Creating new document...");
                        // Create new user document
                        userData = {
                            email: currentUser.email,
                            role: 'free',
                            createdAt: serverTimestamp(),
                            displayName: currentUser.displayName,
                            photoURL: currentUser.photoURL,
                        };
                        await setDoc(userDocRef, userData);
                        console.log("User document created successfully!");
                    }

                    // Merge auth user with firestore data (role)
                    setUser({
                        ...currentUser,
                        role: userData.role || 'free',
                    });
                } catch (error) {
                    console.error("🔥 Error fetching/creating user role in Firestore:", error);
                    if (error.code === 'permission-denied') {
                        console.error("⚠️ PERMISSION DENIED: Check your Firestore Security Rules in Firebase Console!");
                        console.error("Make sure rules allow read/write for authenticated users: allow read, write: if request.auth != null;");
                    }
                    // Fallback to auth user with default role
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
