import React, { useContext, useEffect } from "react"
import { MediaContext } from "../media/MediaProvider"
import { UserContext } from "../users/UserProvider"
import { RecCard } from "./RecCard"
import { RecContext } from "./RecProvider"


export const RecList = () => {
    const {recs, getRecs} = useContext(RecContext)
    const {users, getUsers} = useContext(UserContext)
    const {media, getMedia} = useContext(MediaContext)
    const currentUser = parseInt(sessionStorage.getItem("app_user_id"))
    const sortedRecs = recs.sort((a, b)=> a.orderOfRecommend - b.orderOfRecommend)
    

    useEffect(() => {
        getUsers()
        .then(getMedia)
        .then(getRecs)
    }, [])
    
    return (
        <>
        <h3>My List</h3>
        <ol>
        
            {
                sortedRecs.map(r => {
                    const listOwner = users.find(user => user.id === r.userId)
                    const listMedia = media.find(m => m.id === r.mediaId)
                    return <RecCard key={r.id}
                    recObject={r}
                    listOwner={listOwner}
                    media={listMedia}
                    />
                })
            }
            </ol>
        </>
)
}
