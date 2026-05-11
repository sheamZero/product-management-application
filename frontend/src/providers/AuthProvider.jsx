import AuthContext from "./authContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config"
import { useEffect, useState } from "react";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);


    // sign up user
    const emailPasswordRegister = (email, pass) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, pass);
    }

    // update user name
    const updateUserProfile = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
        })
    }

    // sign in user with email password
    const emailPasswordLogin = (email, pass) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, pass);
    }


    // google login
    const googleLogin = async () => {
        setLoading(true);
        try {
            return await signInWithPopup(auth, googleProvider);
        } finally {
            setLoading(false);
        }
    };


    const signOutUser = async () => {
        setLoading(true);
        try {
            await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {
                withCredentials: true,
            });

            await signOut(auth);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            console.log("User -->>", currentUser);
        })
        return () => unSubscribe();
    }, [])

    const authInfo = {
        googleLogin,
        emailPasswordRegister,
        emailPasswordLogin,
        updateUserProfile,
        signOutUser,
        user,
        loading,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;