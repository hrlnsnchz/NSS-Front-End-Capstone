import React, { createContext, useState } from "react"
import { testAPI } from "../../Settings"

export const MediaContext = createContext()

export const MediaProvider = (props) => {

    const [media, setMedia] = useState([])
    // streamPlats data structure is nested inside an object
    const {streamPlats, setStreamPlats} = useState({})

    const getMedia = () => {
        return fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${testAPI.apiKey}`)
        .then(res => res.json())
        .then(setMedia)
    }

    const getMediaById = (id, mediaType) => {
        return fetch(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${testAPI.apiKey}&language=en-US`)
            .then(res => res.json())
    }

    const [ searchTerms, setSearchTerms ] = useState("")

    const handleAPISearch = (event) => {
        return fetch(`https://api.themoviedb.org/3/search/multi?api_key=${testAPI.apiKey}&query=${event}&language=en-US&page=1&include_adult=false`)
          .then(res => res.json())
          .then(setSearchTerms)
      }

      const getStreamPlatsById = (mediaId, mediaType) => {
        return fetch(`${testAPI.baseURL}${mediaType}/${mediaId}/watch/providers?api_key=${testAPI.apiKey}`)
        .then(res => res.json())
        .then(setStreamPlats)
    }


    return (
        <>
        <MediaContext.Provider value={{
            media, getMedia, getMediaById, searchTerms, setSearchTerms, handleAPISearch, getStreamPlatsById
        }}>
            {props.children}
        </MediaContext.Provider>
        </>
    )
}

