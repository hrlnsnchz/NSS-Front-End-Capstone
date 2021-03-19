import React, { createContext, useState } from "react"

export const RecContext = createContext()

export const RecProvider = (props) => {

    const [recs, setRecs] = useState([])

    const getRecs = () => {
        return fetch("http://localhost:8088/recommendations")
        .then(res => res.json())
        .then(setRecs)
    }

    const getRecsById = (id) => {
        return fetch(`http://localhost:8088/recommendations/${id}?_expand=user&_expand=media`)
            .then(res => res.json())
    }


    return (
        <>
        <RecContext.Provider value={{
            recs, getRecs, getRecsById
        }}>
            {props.children}
        </RecContext.Provider>
        </>
    )
}