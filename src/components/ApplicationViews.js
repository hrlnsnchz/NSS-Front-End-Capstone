import React from "react"
import {MediaList} from "./media/MediaList"
import {MediaProvider} from "./media/MediaProvider"

export const ApplicationViews = () => {
    return (
        <>
            <MediaProvider>
                <MediaList />
            </MediaProvider>
        </>
    )
}