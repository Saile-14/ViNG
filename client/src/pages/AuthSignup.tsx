import { Navigate, Outlet } from "react-router";

export default function AuthSignup () {

    let auth = true;

    if (!auth) {
        return <Navigate to="/not-logged-in" />
    }

    return (
     <Outlet />
    )

}