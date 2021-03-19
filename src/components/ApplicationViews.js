import React from "react"
import {Route} from "react-router-dom"
import {MediaList} from "./media/MediaList"
import {MediaProvider} from "./media/MediaProvider"
import {MediaDetail} from "./media/MediaDetail"
import {NavBar} from "./nav/NavBar"
import { UserProvider } from "./users/UserProvider"
import { RecommendationsList } from "./users/UserProfile"
import { RecProvider } from "./recommendations/RecProvider"
import { RecList } from "./recommendations/RecList"

export const ApplicationViews = () => {
    return (
        <>
            <MediaProvider>
                <RecProvider>
                    <Route exact path="/">
                        <NavBar />
                        <MediaList />
                    </Route>
                    <Route path="/detail/:mediaId(\d+)">
                        <NavBar />  
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
        </>
    )
}