import { Redirect, Route } from "react-router-dom"
import { isLoggedIn } from "./auth";

const ProtectedRoute = ({
    component: Component,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={(props) => (
                isLoggedIn()
                ? <Component {...props} />
                : <Redirect to="/" />
            )}
        />
    )
}

export default ProtectedRoute;