import React, { createContext, useState } from "react"

export const MediaContext = createContext()

export const MediaProvider = (props) => {

    const [media, setMedia] = useState([])

    const getMedia = () => {
        return fetch("http://localhost:8088/media")
        .then(res => res.json())
        .then(setMedia)
    }

    return (
        <>
        <MediaContext.Provider value={{
            media, getMedia
        }}>
            {props.children}
        </MediaContext.Provider>
        </>
    )
}

