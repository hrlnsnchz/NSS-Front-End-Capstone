import React, { useContext, useEffect, useState } from "react"
import { MediaCard } from "./MediaCard"
import { MediaContext } from "./MediaProvider"
import {Link} from "react-router-dom"
import "./Media.css"


export const MediaList = () => {
    const {media, getMedia, searchTerms} = useContext(MediaContext)
    
    const [results, setResults] = useState([])
    const slicedResults = results?.slice()

    

    useEffect(()=> {
        setResults(media.results)
    }, [media])


    useEffect(() => {
        getMedia()
    }, [])

    const [ filteredMedia, setFiltered ] = useState([])
    

    useEffect(() => {
        if (searchTerms !== "") {
            const subset = searchTerms.results
            setFiltered(subset)
        }
    }, [searchTerms, media])

    return (
        <>
        <div className="mediaList search">
          {
            filteredMedia?.map(m => {
                    return <MediaCard key ={m.id}
                                media={m} />
              })
          }
          </div>

        <h3 className="trending__text">Trending</h3>
        <div className="mediaList">
            {
                slicedResults?.map(m => {
                    return <MediaCard key={m.id}
                    media={m} />
                })
            }
        </div>
        </>
)
}