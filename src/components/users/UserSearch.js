import React, { useContext, useEffect, useState } from "react"
import { UserCard } from "../users/User"
import { UserContext } from "../users/UserProvider"


export const UserSearch = () => {
  const { setSearchTerms } = useContext(UserContext)
  

  
  return (
    <>
      Friend search:
      <input type="text" 
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search for a friend... " />
    </>
  )
}
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