import React, { useContext } from "react"
import { MediaContext } from "./MediaProvider"

export const MediaSearch = () => {
  const { setSearchTerms } = useContext(MediaContext)

  return (
    <>
      Media search:
      <input type="text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search for a movie/series... " />
    </>
  )
}