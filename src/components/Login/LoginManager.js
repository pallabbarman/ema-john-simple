import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
};

const setUserToken = () => {
    firebase
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ true)
        .then(function (idToken) {
            sessionStorage.setItem("token", idToken);
        })
        .catch(function (error) {});
};

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then((res) => {
            const { displayName, photoURL, email } = res.user;
            const signInUser = {
                isSignIn: true,
                name: displayName,
                email,
                photo: photoURL,
                success: true,
            };
            setUserToken();
            return signInUser;
        })
        .catch((err) => {
            console.log(err);
            console.log(err.message);
        });
};

export const handleSignOut = () =>
    firebase
        .auth()
        .signOut()
        .then(() => {
            const signOutUser = {
                isSignIn: false,
                name: "",
                photo: "",
                email: "",
                error: "",
                success: false,
            };
            return signOutUser;
        })
        .catch((err) => {
            console.log(err);
        });

const updateUserName = (name) => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name,
    })
        .then(() => {})
        .catch((error) => {
            console.log(error);
        });
};

export const createUserEmailAndPassword = (name, email, password) =>
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
            const newUserInfo = res.user;
            newUserInfo.error = "";
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });

export const signInWithEmailAndPassword = (email, password) =>
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
            const newUserInfo = res.user;
            newUserInfo.error = "";
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
