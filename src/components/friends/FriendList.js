import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { UserContext } from "../users/UserProvider"
import { FriendCard } from "./Friend"
import { FriendContext } from "./FriendProvider"


export const FriendList = () => {
    const { friends, getFriends } = useContext(FriendContext)
    const { users, getUsers, searchTerms } = useContext(UserContext)

    useEffect(() => {
        getUsers()
        .then(getFriends)
    }, [])

    const [ filteredUsers, setFiltered ] = useState([])
    const history = useHistory()

    useEffect(() => {
        if (searchTerms !== "") {
            const subset = users.filter(user => user.name.toLowerCase().includes(searchTerms.toLowerCase()))
            setFiltered(subset)
        } else {
            setFiltered(users)
        }
    }, [searchTerms, users])

    return (
        <>
            <h3>Friends</h3>
            <div className="friendList">
                
                {
                    friends.map(friend => {
                        const sessionUserId = sessionStorage.getItem("app_user_id")
                        const currentUser = users.find(user => user.id === parseInt(sessionUserId))
                        const userObject = users.find(user => user.id === friend.userId)
                        const reversedRoleCurrentUser = users.find(user => user.id === friend.currentUserId)
                        return <FriendCard key={friend.id}
                        userObject={userObject}
                        currentUser={currentUser}
                        reversedRoleCurrentUser={reversedRoleCurrentUser}
                        friend={friend} />
                    })            
                }
                <button onClick={() => history.push("/friends/search")} className="searchFriendsButton">Search for Friends</button>
            </div>
        </>
    )
}