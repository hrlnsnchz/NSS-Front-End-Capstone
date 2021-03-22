import React from "react"
import {Route} from "react-router-dom"
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

export const ApplicationViews = () => {
    return (
        <>
            <MediaProvider>
                <RecProvider>
                    <Route exact path="/">
                        <NavBar />
                        <MediaSearch />
                        <MediaList />
                    </Route>
                    <Route path="/detail/:mediaId(\d+)">
                        <NavBar />  
                        <MediaSearch />
                        <MediaDetail />
                    </Route>
                </RecProvider>
            </MediaProvider>
            <RecProvider>
                <MediaProvider>
                    <UserProvider>
                        <Route exact path="/profile">
                            <NavBar />
                            <RecList />
                        </Route>
                    </UserProvider>
                </MediaProvider>
            </RecProvider>
            <UserProvider>
                <Route exact path="/friends">
                    <NavBar />
                    <UserSearch />
                    <UserList />
                </Route>
            </UserProvider>
        </>
    )
}