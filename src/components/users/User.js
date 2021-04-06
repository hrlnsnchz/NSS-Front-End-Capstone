import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { FriendContext } from "../friends/FriendProvider"
import ListGroup from 'react-bootstrap/ListGroup'


export const UserCard = ({user}) => {
  const { getFriends } = useContext(FriendContext)
  const currentUser = parseInt(sessionStorage.getItem("app_user_id"))

  useEffect(() => {
    getFriends()
  }, [])

      if (user.id !== currentUser) {
        return (
          <ListGroup className="user">
            <ListGroup.Item action href={`/profile/${user.id}`}> 
              {user.name}
              </ListGroup.Item>
            
          </ListGroup>
)} else {
  return ("")
}
}