import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router"
import { RecContext } from "../recommendations/RecProvider"
import {UserContext} from "./UserProvider"

export const UserProfile = () => {
    const {getUserById} = useContext(UserContext)
    const {recs, getRecs} = useContext(RecContext)
    const currentUser = parseInt(sessionStorage.getItem("app_user_id"))

    const [user, setUsers] = useState([])

    const {userId} = useParams()

    useEffect(() => {
        getRecs()
    }, [])

    const [sortedRecs, setSortedRecs] = useState([])
    

    useEffect(() => {
        setSortedRecs(recs.sort((a, b) => a.orderOfRecommend - b.orderOfRecommend))
      }, [recs])

    useEffect(() => {
        getUserById(userId)
        .then((response) => {
            setUsers(response)
        })
    }, [])

    const imgSize = "w500"

    return (
        <>
            <section className="userProfile">
                <h3 className="userProfile__name">{user.name}'s Recommendations</h3>
                <ol className="recommendationsList">
                    {sortedRecs.map((r)=>{
                        if (r.userId === parseInt(userId)) {
                            return (
                                <li className="recommendation" key={r.id}>
                                    <a href={`/detail/${r.mediaId}/${r.mediaType}`}>
                                    <img src={`http://image.tmdb.org/t/p/${imgSize}/${r.posterPath}`} alt={r.name, "poster"} ></img>
                                    </a>
                                </li>
                            )
                        }
                    })}

                </ol>
                
            </section>
        </>
    )
}