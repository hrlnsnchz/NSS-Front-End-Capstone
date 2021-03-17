import React, { useContext, useEffect, useState } from "react"
import { MediaContext } from "./MediaProvider"
import { useParams, useHistory } from "react-router-dom"

export const MediaDetail = () => {
  const { getMediaById } = useContext(MediaContext)

	const [media, setMedia] = useState({})

	const {mediaId} = useParams();
	// const history = useHistory();

  
  useEffect(() => {
    getMediaById(mediaId)
    .then((response) => {
      setMedia(response)
    })
    }, [])

  return (
    <section className="media">
      <h3 className="media__name">{media.name}</h3>
      <div className="media__genre">Genre: {media.genre?.name}</div>
      <div className="media__platform">streaming Platform: {media.streamingPlatform?.name}</div>
    </section>
  )
}