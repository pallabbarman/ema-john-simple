import { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { userContext } from "../../App";
import {
    createUserEmailAndPassword,
    handleGoogleSignIn,
    handleSignOut,
    initializeLoginFramework,
    signInWithEmailAndPassword,
} from "./LoginManager";

function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        name: "",
        email: "",
        password: "",
        photo: "",
    });

    initializeLoginFramework();
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    };

    const googleSignIn = () => {
        handleGoogleSignIn().then((res) => {
            handleResponse(res, true);
        });
    };

    const signOut = () => {
        handleSignOut().then((res) => {
            handleResponse(res, false);
        });
    };

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserEmailAndPassword(
                user.name,
                user.email,
                user.password
            ).then((res) => {
                handleResponse(res, true);
            });
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password).then(
                (res) => {
                    handleResponse(res, true);
                }
            );
        }
        e.preventDefault();
    };

    const handleBlur = (event) => {
        let isFieldValid = true;
        if (event.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === "password") {
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
        <div style={{ textAlign: "center" }}>
            {user.isSignIn ? (
                <button onClick={signOut} type="button">
                    Sign Out
                </button>
            ) : (
                <button onClick={googleSignIn} type="button">
                    Sign In with Google
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
                Sign Up{" "}
                <input
                    type="checkbox"
                    onChange={() => setNewUser(!newUser)}
                    name="newUser"
                    id=""
                />
            </label>
            <form onSubmit={handleSubmit}>
                {newUser && (
                    <input
                        type="text"
                        name="name"
                        onBlur={handleBlur}
                        placeholder="Your Name"
                    />
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
                <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
            </form>
            <p style={{ color: "red" }}>{user.error}</p>
            {user.success && (
                <p style={{ color: "green" }}>
                    User {newUser ? "Account create" : "Logged In"} successfully
                </p>
            )}
        </div>
    );
}

export default Login;
