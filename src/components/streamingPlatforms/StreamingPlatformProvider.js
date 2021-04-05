import React, { createContext, useState } from "react"

export const StreamPlatContext = createContext()

export const StreamPlatProvider = (props) => {
    const [streamPlats, setStreamPlats] = useState([])
    

    const getStreamPlats = () => {
        return fetch("http://localhost:8088/streamingPlatforms")
        .then(res => res.json())
        .then(setStreamPlats)
    }

    const getStreamPlatsById = (id) => {
        return fetch(`http://localhost:8088/streamingPlatforms/${id}`)
            .then(res => res.json())
    }
    
    return (
        <StreamPlatContext.Provider value={{
            streamPlats, getStreamPlats, getStreamPlatsById
        }}>
            {props.children}
        </StreamPlatContext.Provider>
    )
}