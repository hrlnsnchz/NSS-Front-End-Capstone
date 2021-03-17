import React from "react"
import {Route} from "react-router-dom"
import {MediaList} from "./media/MediaList"
import {MediaProvider} from "./media/MediaProvider"
import {MediaDetail} from "./media/MediaDetail"
import {NavBar} from "./nav/NavBar"

export const ApplicationViews = () => {
    return (
        <>
            <MediaProvider>
                <Route exact path="/">
                    <NavBar />
                    <MediaList />
                </Route>
                <Route path="/detail/:mediaId(\d+)">
                    <NavBar />  
		            <MediaDetail />
	            </Route>
            </MediaProvider>
        </>
    )
}