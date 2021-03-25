import React, {useContext} from "react"
import { UserContext } from "./UserProvider"


export const UserSearch = () => {
  const { setSearchTerms } = useContext(UserContext)
  
  return (
    <>
      {sessionStorage.getItem("app_user_id")? "Friend" : "User"} search: 
      <input type="text" 
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search for a user... " />
    </>
  )
}
