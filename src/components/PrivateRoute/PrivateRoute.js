/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { userContext } from "../../App";

const PrivateRoute = ({ children, ...rest }) => {
    const [loggedInUser] = useContext(userContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                loggedInUser.email || sessionStorage.getItem("token") ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};
export default PrivateRoute;
