import React, {useContext} from "react"
import { UserContext } from "./UserProvider"


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
