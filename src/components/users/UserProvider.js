import React, { createContext, useState } from "react"

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [users, setUsers] = useState([])
    const [ searchTerms, setSearchTerms ] = useState("")

    const getUsers = () => {
    return fetch("http://localhost:8088/users")
    .then(res => res.json())
    .then(setUsers)
    }

    const getUserById = (id) => {
        return fetch(`http://localhost:8088/users/${id}`)
            .then(res => res.json())
    }
    
    return (
        <UserContext.Provider value={{
            users, getUsers, searchTerms, setSearchTerms, getUserById
        }}>
            {props.children}
        </UserContext.Provider>
    )
}