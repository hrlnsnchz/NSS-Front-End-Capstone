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

    const addRecs = (recObj) => {
        return fetch("http://localhost:8088/recommendations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(recObj)
        })
        .then(getRecs)
    }

    const removeRec = recId => {
        return fetch(`http://localhost:8088/recommendations/${recId}`, {
            method: "DELETE"
        })
        .then(getRecs)
    }

    const updateRec = rec => {
        return fetch(`http://localhost:8088/recommendations/${rec.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(rec)
        })
      }


    return (
        <>
        <RecContext.Provider value={{
            recs, getRecs, getRecsById, addRecs, removeRec, updateRec
        }}>
            {props.children}
        </RecContext.Provider>
        </>
    )
}