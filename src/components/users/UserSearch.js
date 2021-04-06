import React, { useContext, useEffect, useState } from "react"
import { UserCard } from "../users/User"
import { UserContext } from "../users/UserProvider"
import { Button, FormControl, Form} from "react-bootstrap"

export const UserSearch = () => {
  const { setSearchTerms } = useContext(UserContext)
  
// <Form inline>
//             <FormControl size="sm" type="text" placeholder="Search" className="mr-sm-2" 
//             onKeyUp={(event) => handleAPISearch(event.target.value)}
//             placeholder="Search for a movie/series... "/>
//             <Button size="sm" variant="outline-info">Search</Button>
//         </Form>
  
  return (
    <>
    <h3 className="userSearchHeadline">See Other Users' Recommendations</h3>
    <Form inline>
      <FormControl size="sm" type="text" 
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search for other users... " />
        <Button size="sm" variant="outline-info">Search</Button>
        </Form>
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