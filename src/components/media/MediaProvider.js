import React, { createContext, useState } from "react"

export const MediaContext = createContext()

export const MediaProvider = (props) => {

    const [media, setMedia] = useState([])

    const getMedia = () => {
        return fetch("http://localhost:8088/media")
        .then(res => res.json())
        .then(setMedia)
    }

    const getMediaById = (id) => {
        return fetch(`http://localhost:8088/media/${id}?_expand=genre&_expand=streamingPlatform`)
            .then(res => res.json())
    }

    const [ searchTerms, setSearchTerms ] = useState("")


    return (
        <>
        <MediaContext.Provider value={{
            media, getMedia, getMediaById, searchTerms, setSearchTerms
        }}>
            {props.children}
        </MediaContext.Provider>
        </>
    )
}

