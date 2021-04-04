import React, {useState, useEffect, useContext}from "react"
import {UserContext} from "./UserProvider"
import {UserCard} from "./User"


export const UserList = () => {
    const { users, getUsers, searchTerms } = useContext(UserContext)
    console.log('users: ', users);

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