import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { FriendContext } from "../friends/FriendProvider"



export const UserCard = ({user}) => {
  const {friends, getFriends, addFriend} = useContext(FriendContext)
  const currentUser = parseInt(sessionStorage.getItem("app_user_id"))

  useEffect(() => {
    getFriends()
  }, [])
  const friend = friends.filter(fr => fr.userId !== user.id && fr.currentUserId !== user.id)


  const history = useHistory()
  const handleAddFriend = () => {
        
        addFriend({
            userId: user.id,
            currentUserId: currentUser
        })
        .then(() => history.push("/friends"))
      }
      if (user.id !== currentUser) {
        console.log("friend", friend)
        return (
          <section className="user">
        <h3 className="user__name">
          {user.name + "  "}
          {<button className="btn btn-primary"
          onClick={event => {
            event.preventDefault()
            handleAddFriend()
          }}>Add Friend</button>}
        </h3>
        
    </section>
)} else {
  return ("")
}
}