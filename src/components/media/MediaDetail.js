import React, { useContext, useEffect, useState } from "react"
import { MediaContext } from "./MediaProvider"
import { useParams, useHistory } from "react-router-dom"
import {RecContext} from "../recommendations/RecProvider"


export const MediaDetail = () => {
  const { getMediaById } = useContext(MediaContext)
  const {recs, getRecs, addRecs } = useContext(RecContext)
  const currentUser = parseInt(sessionStorage.getItem("app_user_id"))


	const [media, setMedia] = useState({})

	const {mediaId} = useParams();
	// const history = useHistory();

  useEffect(()=> {
    getRecs()
  }, [])
  useEffect(() => {
    getMediaById(mediaId)
    .then((response) => {
      setMedia(response)
    })
    }, [])

    const history = useHistory()

    const handleAddRec = () => {

      // orderOfRecommend: 3
      addRecs({
          userId: currentUser,
          mediaId: media.id,
          orderOfRecommend: recs[0]? recs[recs.length - 1].orderOfRecommend + 1 : 1
      })
  }

  return (
    <section className="media">
      <h3 className="media__name">{media.name}</h3>
      <div className="media__type">{media.movie? "Movie" : "TV Series"}</div>
      <div className="media__genre">Genre: {media.genre?.name}</div>
      <div className="media__platform">Streaming Platform: {media.streamingPlatform?.name}</div>
      {<button className="btn btn-primary"
          onClick={event => {
            event.preventDefault()
            handleAddRec()
          }}>Recommend It</button>}
    </section>
  )
}