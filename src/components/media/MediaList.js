import React, { useContext, useEffect } from "react"
import { MediaCard } from "./MediaCard"
import { MediaContext } from "./MediaProvider"

export const MediaList = () => {
    const {media, getMedia} = useContext(MediaContext)

    useEffect(() => {
        getMedia()
    }, [])

    return (
        <div className="mediaList">
            {
                media.map(m => {
                   return <MediaCard key={m.id}
                   media={m}
                   />
                })
            }
        </div>
)
}