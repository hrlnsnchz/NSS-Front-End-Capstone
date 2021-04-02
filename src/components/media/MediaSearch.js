import React, { useContext } from "react"
import { testAPI } from "../../Settings"
import { MediaContext } from "./MediaProvider"

export const MediaSearch = () => {
  const { searchTerms, setSearchTerms, handleAPISearch } = useContext(MediaContext)

  

  return (
    <>
      Media search:
      <input type="text"
        className="input--wide"
        onKeyUp={(event) => handleAPISearch(event.target.value)}
        placeholder="Search for a movie/series... " />
    </>
  )
}