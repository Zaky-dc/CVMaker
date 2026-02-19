import { db } from "./firebase";
import { collection, getDocs, doc, updateDoc, query, where } from "firebase/firestore";

export const getAllUsers = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const searchUsersByEmail = async (email) => {
    try {
        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error searching users:", error);
        throw error;
    }
};

export const updateUserRole = async (userId, newRole) => {
    try {
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, { role: newRole });
        return true;
    } catch (error) {
        console.error("Error updating user role:", error);
        throw error;
    }
};
