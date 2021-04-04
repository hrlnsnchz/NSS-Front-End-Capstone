import React, { createContext, useState } from "react"

export const FriendContext = createContext()

export const FriendProvider = (props) => {
    const [friends, setFriends] = useState([])

    const getFriends = () => {
        return fetch("http://localhost:8088/friends")
        .then(res => res.json())
        .then(setFriends)
    }

    // const [ searchTerms, setSearchTerms ] = useState("")

    const addFriend = (friendObj) => {
        return fetch("http://localhost:8088/friends", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(friendObj)
        })
        .then(getFriends)
    }
//throw away comment
    const getFriendById = (id) => {
        return fetch(`http://localhost:8088/friends/${id}`)
            .then(res => res.json())
    }

    const getFriendsByCurrentUser = (id) => {
        return fetch(`http://localhost:8088/friends?currentUserId=${id}`)
            .then(res => res.json())
            // .then(setFriends)
    }

    const getUsersFriends = (id) =>{
        return fetch(`http://localhost:8088/friends?userId=${id}`)
        .then(res => res.json())
        .then(setFriends)
    }
    // Need function to remove a friend. This is not functional yet.
    const removeFriend = (friendObj) => {
        return fetch(`http://localhost:8088/friends/${friendObj.id}`, {
            method: "DELETE"
        })
        .then(getFriends)
    }

    return (
        <FriendContext.Provider value={{
            friends, getFriends, addFriend, getFriendById, getUsersFriends, removeFriend, getFriendsByCurrentUser
        }}>
            {props.children}
        </FriendContext.Provider>
    )
}