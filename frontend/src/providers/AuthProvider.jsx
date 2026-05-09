import AuthContext from "./authContext";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import auth from "../firebase/firebase.config"
import { useEffect, useState } from "react";

const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);


    // google login
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            console.log("User -->>", currentUser);
            // if (currentUser) {
            //     const token_user = { email: currentUser?.email };
            //     axios.post(`${import.meta.env.VITE_API_URL}/jwt`, token_user, { withCredentials: true })
            //         .then(res => {
            //             console.log(res.data);
            //         })
            // }
        })
        return () => unSubscribe();
    }, [])

    const authInfo = {
        googleLogin,
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