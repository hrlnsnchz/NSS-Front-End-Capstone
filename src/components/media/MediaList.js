import React, { useContext, useEffect, useState } from "react"
import { MediaCard } from "./MediaCard"
import { MediaContext } from "./MediaProvider"
import {Link} from "react-router-dom"

const handleLogout = () => {
    sessionStorage.removeItem("app_user_id")
}

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
        <>
        <h3>Browse Media</h3>
        <div className="mediaList">
            {
                filteredMedia.map(m => {
                   return <MediaCard key={m.id}
                   media={m}
                   />
                })
            }
        </div>

        <h3>Action</h3>
        <div className="mediaList">
            {
                media.map(m => {
                    if (m.genreId === 1) {
                        return <MediaCard key={m.id}
                        media={m}
                        />
                    }
                })
            }
        </div>

        <h3>Science Fiction</h3>
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
        </div>


        <button onClick={handleLogout}>
        <Link to="/login">Logout</Link>
        </button>
         
        </>
)
}