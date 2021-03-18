import React, { useContext, useEffect } from "react"
import { MediaCard } from "../media/MediaCard"
import { MediaContext } from "../media/MediaProvider"
import {UserContext} from "./UserProvider"

export const RecommendationsList = () => {
    const {users, getUsers} = useContext(UserContext)
    const {media, getMedia} = useContext(MediaContext)

    useEffect(()=> {
        getMedia()
        .then(getUsers)
    }, [])

    return (
        <article className="recommendationsList">
            {users.map(user => {
                const currentUser = users.find(user => user.id === parseInt(sessionStorage.getItem("app_user_id")))
                return <h3>{currentUser.name}'s List</h3>
            })
            }
            <div className="mediaList">
            {
                media.map(m => {
                   return <MediaCard key={m.id}
                   media={m}
                   />
                })
            }
        </div>
        </article>
    )

}