import React, { useContext, useEffect, useState } from "react"
import { MediaCard } from "./MediaCard"
import { MediaContext } from "./MediaProvider"

export const MediaList = () => {
    const {media, getMedia, searchTerms} = useContext(MediaContext)

    useEffect(() => {
        getMedia()
    }, [])

    const [ filteredMedia, setFiltered ] = useState([])

    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching animals
            const subset = media.filter(m => m.name.toLowerCase().includes(searchTerms.toLowerCase()))
            setFiltered(subset)
        } else {
             // If the search field is blank, display all animals
            setFiltered(media)
        }
    }, [searchTerms, media])
    return (
        <div className="mediaList">
            {
                filteredMedia.map(m => {
                   return <MediaCard key={m.id}
                   media={m}
                   />
                })
            }
        </div>
)
}