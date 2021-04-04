import React from "react"
import {Route, Redirect} from "react-router-dom"
import {MediaList} from "./media/MediaList"
import {MediaProvider} from "./media/MediaProvider"
import {MediaDetail} from "./media/MediaDetail"
import { UserProvider } from "./users/UserProvider"
import { RecProvider } from "./recommendations/RecProvider"
import { MediaSearch } from "./media/MediaSearch"
import { UserList } from "./users/UserList"
import { UserSearch } from "./users/UserSearch"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { RecForm } from "./recommendations/RecForm"
import { FriendList } from "./friends/FriendList"
import { FriendProvider } from "./friends/FriendProvider"
import { UserProfile } from "./users/UserProfile"


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
                        <MediaDetail />
                    </Route>
                </RecProvider>
            </MediaProvider>
            <RecProvider>
                <MediaProvider>
                    <UserProvider>
                        <Route exact path="/profile" render={() => sessionStorage.getItem("app_user_id") ? <RecForm /> : <Redirect to="/login" />} />
                        <Route path="/profile/:userId(\d+)">
                        <UserProfile />
                    </Route>
                    </UserProvider>
                </MediaProvider>
            </RecProvider>
            <UserProvider>
                <FriendProvider>
                    <Route exact path="/friends" >
                         <UserSearch />  
                         <UserList />
                    </Route>
                    <Route exact path="/friends" render={() => sessionStorage.getItem("app_user_id") ? <FriendList />  : "" } />
                </FriendProvider>
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