import React, {useState, useEffect, useContext}from "react"
import {UserContext} from "./UserProvider"
import {UserCard} from "./UserCard"
export const UserList = () => {
    const { users, getUsers, searchTerms } = useContext(UserContext)

    useEffect(() => {
        getUsers()
        // .then(getFriends)
    }, [])

    const [ filteredUsers, setFiltered ] = useState([])
    

    useEffect(() => {
        if (searchTerms !== "") {
            
            const subset = users.filter(user => user.name.toLowerCase().includes(searchTerms.toLowerCase()))
            setFiltered(subset)
        } else {
            setFiltered(users)
        }
    }, [searchTerms, users])

    return (
        <div className="userList">
            
            {
                filteredUsers.map(filteredUser => {
                        return <UserCard key={filteredUser.id}
                        user={filteredUser}
                        />
                    })            
            }
        </div>
    )
}