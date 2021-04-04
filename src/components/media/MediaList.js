import React, { useContext, useEffect, useState } from "react"
import { MediaCard } from "./MediaCard"
import { MediaContext } from "./MediaProvider"
import {Link} from "react-router-dom"
import "./Media.css"

const handleLogout = () => {
    sessionStorage.removeItem("app_user_id")
}

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
    console.log('filteredMedia: ', filteredMedia);
    

    useEffect(() => {
        if (searchTerms !== "") {
            const subset = searchTerms.results
            setFiltered(subset)
        }
    }, [searchTerms, media])

    return (
        <>
        <button className="logout" onClick={handleLogout}>
        <Link to="/login">{sessionStorage.getItem("app_user_id")? "Logout" : "Login"}</Link>
        </button>

        <div className="mediaList search">
          {
            filteredMedia?.map(m => {
                    return <MediaCard key ={m.id}
                                media={m} />
              })
          }
          </div>

        <h3>Popular</h3>
        <div className="mediaList">
            {
                slicedResults?.map(m => {
                    return <MediaCard key={m.id}
                    media={m} />
                })
            }
        </div>

        {/* <h3>Action</h3>
        <div className="mediaList">
            {
               media.results.map(r => {
                return r.title
               })
            } */}
        {/* {
      "id": 1,
      "movie": true,
      "name": "Blade Runner 2049",
      "genreId": [
        {
          "name": 1
        },
        {
          "name": 2
        }
      ],
      "streamingPlatformId": 2
    }, */}

        {/* </div> */}

        {/* <h3>Science Fiction</h3>
        <div className="mediaList">
            {
                media.map(m => {
                    if (m.genreId === 2) {
                        return <MediaCard key={m.id}
                        media={m}
                        />
                    }
                })
            }
        </div> */}


        
         
        </>
)
}