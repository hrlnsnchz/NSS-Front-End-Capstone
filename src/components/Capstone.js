import { ApplicationViews } from "./ApplicationViews"
import { Route, Redirect } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { userStorageKey } from "./auth/authSettings"

   
export const Capstone = () => (
    <>
            <Route render={() => {
                if (sessionStorage.getItem(userStorageKey)) {
                    return (
                        <>
                            <ApplicationViews />
                        </>
                    )
                } else {
                    return <Redirect to="/login" />;
                }
    }} />

            <Route path="/login">
            <Login />
            </Route>
            <Route path="/register">
            <Register />
            </Route>
</>
)