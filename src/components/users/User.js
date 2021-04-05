import React, { useContext, useEffect } from "react"
import { useHistory, Link } from "react-router-dom"
import { FriendContext } from "../friends/FriendProvider"



export const UserCard = ({user}) => {
  const {friends, getFriends, addFriend} = useContext(FriendContext)
  const currentUser = parseInt(sessionStorage.getItem("app_user_id"))

  useEffect(() => {
    getFriends()
  }, [])
  const friend = friends.filter(fr => fr.userId !== user.id && fr.currentUserId !== user.id)


  const history = useHistory()
  // const handleAddFriend = () => {
        
  //       addFriend({
  //           userId: user.id,
  //           currentUserId: currentUser
  //       })
  //       .then(() => history.push("/friends"))
  //     }
      if (user.id !== currentUser) {
        return (
          <section className="user">
        <h3 className="user__name"> <Link to={`/profile/${user.id}`}>
          {user.name + "  "}
          
          {/* {<button className="btn btn-primary"
          onClick={event => {
            event.preventDefault()
            handleAddFriend()
          }}>Add Friend</button>} */}
          </Link>
        </h3>
        
    </section>
)} else {
  return ("")
}
}