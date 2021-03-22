import React from "react"


export const UserCard = ({user}) => {
  const currentUser = parseInt(sessionStorage.getItem("nutshell_user"))
 
      if (user.id !== currentUser) {
        return (
          <section className="user">
        <h3 className="user__name">
          {user.name + "  "}
        </h3>
        
    </section>
)} else {
  return ("")
}
}