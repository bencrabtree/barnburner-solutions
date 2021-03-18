import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { http } from '../../util/api';
import { isLoggedIn } from '../../util/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn() ? (
                    <Component {...props} />
                ) : (
                    <LoginPage />
                )
            }
        />
    );
};

const LoginPage = () => {
    // http.get('/auth/signin')
    return (
        <Redirect to='/auth/signin' />
    )
}

export default PrivateRoute;