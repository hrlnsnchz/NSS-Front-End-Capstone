import React, { useContext } from "react"
import { FriendContext } from "./FriendProvider"
import { useHistory } from "react-router-dom"

// "friend" is the friendship table, "userObject" is the object for a user in that relationship, 
// "currentUser" is the object of the current user (not related to the friend table), 
// and "reversedRoleCurrentUser" is the object for the currentUser (related to the table)
// Needed 2 versions of the current user because the current user could be listed in the database as a "userId" instead of a "currentUserId" and I needed to be able to list them regardless without duplicating the data.

export const FriendCard = ({friend, userObject, currentUser, reversedRoleCurrentUser}) => {
    console.log('currentUser: ', currentUser);

  const { removeFriend } = useContext(FriendContext)
  const history = useHistory()

  // I put this function within the friend card because it's already iterating through the friend relationships and I need that data as a param in order to delete it
  const handleRemove = () => {
    removeFriend(friend)
    .then(() => {
      history.push("/friends")
    })
  }

  return (
  <section className="friend">
        <h3 className="friend__name">
          {friend.currentUserId === currentUser.id? userObject.name + " " + "is your Friend  " : ""}
          {friend.userId === currentUser.id? reversedRoleCurrentUser.name + " " + "is your Friend  ": ""}
          {/* Had to add the buttons below because I couldn't add them above when those conditions came back false, so I had "remove friend" buttons for invisible friends */}
          {friend.currentUserId === currentUser.id? <button onClick={handleRemove} className="removeFriendButton">Remove Friend</button> : ""} 
          {friend.userId === currentUser.id? <button onClick={handleRemove} className="removeFriendButton">Remove Friend</button> : ""}
        </h3>
    </section>
)
}