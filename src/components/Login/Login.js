/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
import firebase from 'firebase/app';
import 'firebase/auth';
import { useContext, useState } from 'react';
import { userContext } from '../../App';
import firebaseConfig from './firebase.config';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
    });

    const [setLoggedInUser] = useContext(userContext);

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const handleSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(googleProvider)
            .then((res) => {
                const { displayName, photoURL, email } = res.user;
                const signInUser = {
                    isSignIn: true,
                    name: displayName,
                    email,
                    photo: photoURL,
                };
                setUser(signInUser);
            })
            .catch((err) => {
                console.log(err);
                console.log(err.message);
            });
    };

    const handleSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                const signOutUser = {
                    isSignIn: false,
                    name: '',
                    photo: '',
                    email: '',
                    error: '',
                    success: false,
                };
                setUser(signOutUser);
            })
            .catch((err) => {
                console.log(err);
            });
    };

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

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(user.email, user.password)
                .then(() => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        if (!newUser && user.email && user.password) {
            firebase
                .auth()
                .signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    console.log(res.user);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        e.preventDefault();
    };
    const handleBlur = (event) => {
        let isFieldValid = true;
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            {user.isSignIn ? (
                <button onClick={handleSignOut} type="button">
                    Sign Out
                </button>
            ) : (
                <button onClick={handleSignIn} type="button">
                    Sign In
                </button>
            )}
            <br />
            {user.isSignIn && (
                <div>
                    <p>Welcome, {user.name}</p>
                    <p>Your Email: {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            )}

            <h1>Our own Authentication</h1>

            <label htmlFor="newUser">
                Sign Up{' '}
                <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            </label>
            <form onSubmit={handleSubmit}>
                {newUser && (
                    <input type="text" name="name" onBlur={handleBlur} placeholder="Your Name" />
                )}
                <br />
                <input
                    type="text"
                    name="email"
                    onBlur={handleBlur}
                    placeholder="Enter your email address"
                    required
                />
                <br />
                <input
                    type="password"
                    onBlur={handleBlur}
                    name="password"
                    placeholder="Enter your password"
                    required
                />
                <br />
                <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {user.success && (
                <p style={{ color: 'green' }}>
                    User {newUser ? 'Account create' : 'Logged In'} successfully
                </p>
            )}
        </div>
    );
}

export default Login;
