// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAohYD8UVsFZSFV7fHXE83BSIx7PmBPFdU",
    authDomain: "product-management-appli-fa302.firebaseapp.com",
    projectId: "product-management-appli-fa302",
    storageBucket: "product-management-appli-fa302.firebasestorage.app",
    messagingSenderId: "357598611541",
    appId: "1:357598611541:web:7876ab9612a4b18ce6ecdc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;