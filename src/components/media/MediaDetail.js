import React, { useContext, useEffect, useState } from "react"
import { MediaContext } from "./MediaProvider"
import { useParams } from "react-router-dom"
import {RecContext} from "../recommendations/RecProvider"


export const MediaDetail = () => {
  const { getMediaById, getStreamPlatsById } = useContext(MediaContext)
  const {recs, getRecs, addRecs } = useContext(RecContext)
  const currentUser = parseInt(sessionStorage.getItem("app_user_id"))
  const sortedRecs = recs.sort((a, b)=> a.orderOfRecommend - b.orderOfRecommend)


	const [media, setMedia] = useState({})

	const {mediaId, mediaType} = useParams();

  const [streamPlats, setStreamPlats] = useState([])
  
  const streamPlatsArray = streamPlats.results?.US?.flatrate
  console.log('slicedStreamPlats: ', streamPlatsArray);

	

  

  useEffect(()=> {
    getRecs()
  }, [])

  useEffect(() => {
    getMediaById(mediaId, mediaType)
    .then((response) => {
      setMedia(response)
    })
    }, [])

    useEffect(() => {
      getStreamPlatsById(mediaId, mediaType)
      .then((response) => {
        setStreamPlats(response)
      })
    }, [])

    const [genres, setGenres] = useState([])

    useEffect(()=> {
      setGenres(media.genres)
  }, [media])
  
  const slicedGenres = genres?.slice()

    const handleAddRec = () => {
      addRecs({
          userId: currentUser,
          mediaId: media.id,
          // mediaTitle property names vary by media type
          mediaTitle: media.name? media.name : media.title,
          // slicedGenres could not be assigned before being assigned a value in the useEffect hook
          genres: slicedGenres? slicedGenres: "No Genre Available",
          // order of recommend starts at 1 if the index at 0 does not exist, otherwise I add 1 to push it to the bottom of the list
          orderOfRecommend: sortedRecs[0]? sortedRecs[sortedRecs.length - 1].orderOfRecommend + 1 : 1 
      })
  }

  return (
    <section className="media">
      <h3 className="media__name">{media.name? media.name : media.title}</h3>
      <p className="media__overview">{media.overview}</p>
      <p className="media__date">Released: {media.release_date? media.release_date : media.first_air_date}</p>
      <div className="media__list genres">Genres:{slicedGenres?.map(g => {
        return (<p className="genre" key={g.id}> {g.name}</p>)
      })}</div>
      <h3>{streamPlatsArray? "Watch it on:" : ""}</h3>
      <div className="media_list streamingPlatforms">{streamPlatsArray?.map(sP => {
        return (<p className="streamingPlatform" key={sP.provider_id}>{sP.provider_name}</p>)
      })}</div>
      {sessionStorage.getItem("app_user_id")? <button className="btn btn-primary"
          onClick={event => {
            event.preventDefault()
            handleAddRec()
          }}>Recommend It</button> : ""}
    </section>
  )
}