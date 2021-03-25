import React from "react"
import {Route, Redirect} from "react-router-dom"
import {MediaList} from "./media/MediaList"
import {MediaProvider} from "./media/MediaProvider"
import {MediaDetail} from "./media/MediaDetail"
import {NavBar} from "./nav/NavBar"
import { UserProvider } from "./users/UserProvider"
import { RecProvider } from "./recommendations/RecProvider"
import { RecList } from "./recommendations/RecList"
import { MediaSearch } from "./media/MediaSearch"
import { UserList } from "./users/UserList"
import { UserSearch } from "./users/UserSearch"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

export const ApplicationViews = () => {
    return (
        <>
            <MediaProvider>
                <RecProvider>
                    <Route exact path="/">
                        <MediaSearch />
                        <MediaList />
                    </Route>
                    <Route path="/detail/:mediaId(\d+)">
                        <MediaSearch />
                        <MediaDetail />
                    </Route>
                </RecProvider>
            </MediaProvider>
            <RecProvider>
                <MediaProvider>
                    <UserProvider>
                        <Route exact path="/profile" render={() => sessionStorage.getItem("app_user_id") ? <RecList /> : <Redirect to="/login" />} />
                    </UserProvider>
                </MediaProvider>
            </RecProvider>
            <UserProvider>
            <Route exact path="/friends">
                    <UserSearch />
                    <UserList />
                </Route>
            </UserProvider>

            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
        </>
    )
}

// <Route exact path="/profile">
//                             <RecList />
//                         </Route>

<Route exact path="/friends">
                    <UserSearch />
                    <UserList />
                </Route>