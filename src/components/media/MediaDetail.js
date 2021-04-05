import React, { useContext, useEffect, useState } from "react"
import { MediaContext } from "./MediaProvider"
import { useParams } from "react-router-dom"
import {RecContext} from "../recommendations/RecProvider"
import "./MediaDetail.css"
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

export const MediaDetail = () => {
  const { getMediaById, getStreamPlatsById } = useContext(MediaContext)
  const {recs, getRecs, addRecs } = useContext(RecContext)
  const currentUser = parseInt(sessionStorage.getItem("app_user_id"))
  const sortedRecs = recs.sort((a, b)=> a.orderOfRecommend - b.orderOfRecommend)


	const [media, setMedia] = useState({})

	const {mediaId, mediaType} = useParams();

  const [streamPlats, setStreamPlats] = useState([])
  
  const streamPlatsArray = streamPlats.results?.US?.flatrate

	

  

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
          // URL for media's poster
          posterPath: media.poster_path, 
          mediaType: mediaType, //currently not approved
          
          // order of recommend starts at 1 if the index at 0 does not exist, otherwise I add 1 to push it to the bottom of the list
          orderOfRecommend: sortedRecs[0]? sortedRecs[sortedRecs.length - 1].orderOfRecommend + 1 : 1 
      })
  }

  return (
    <>
    <img className="media__image" src={`http://image.tmdb.org/t/p/w500/${media.poster_path}`} alt={media.name, "poster"} ></img>
    <Card style={{ width: '40rem' }}>
    <Card.Body>
        <Card.Title>{media.name? media.name : media.title}</Card.Title>
    <Card.Text>
        {media.overview}
    </Card.Text>
      </Card.Body>
    <ListGroup className="list-group-flush">
    <ListGroup.Item>{slicedGenres?.map(g => {
      return (<p className="genre" key={g.id}> {g.name}</p>)
    })}</ListGroup.Item>
      <ListGroup.Item>
      {media.release_date? new Date(media.release_date).getFullYear() : new Date(media.first_air_date).getFullYear()}
      </ListGroup.Item>
      <ListGroup.Item>
      {streamPlatsArray?.map(sP => {
        return (<p className="streamingPlatform" key={sP.provider_id}>{sP.provider_name}</p>)
      })}
      </ListGroup.Item>
    </ListGroup>
      {sessionStorage.getItem("app_user_id")? <Button variant="info" className="btn btn-primary"
          onClick={event => {
            event.preventDefault()
            handleAddRec()
          }}>Recommend It</Button> : ""}
    </Card>
    </>
    
  )
}

{/* <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={`http://image.tmdb.org/t/p/w500/${media.poster_path}/100px180`}" />
  <Card.Body>
    <Card.Title>{media.name? media.name : media.title}</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card> */}

{/* <article>
      <img className="media__image" src={`http://image.tmdb.org/t/p/w500/${media.poster_path}`} alt={media.name, "poster"} ></img>
      <h3 className="media__name">{media.name? media.name : media.title}</h3>
      <div className="media__genres">{slicedGenres?.map(g => {
        return (<p className="genre" key={g.id}> {g.name}</p>)
      })}</div>
      <p className="media__date">{media.release_date? new Date(media.release_date).getFullYear() : new Date(media.first_air_date).getFullYear()}</p> 
      <p className="media__overview">{media.overview}</p>
      <h3>{streamPlatsArray? "Watch it on:" : ""}</h3>
      <div className="media_list streamingPlatforms">{streamPlatsArray?.map(sP => {
        return (<p className="streamingPlatform" key={sP.provider_id}>{sP.provider_name}</p>)
      })}</div>
      {sessionStorage.getItem("app_user_id")? <button className="btn btn-primary"
          onClick={event => {
            event.preventDefault()
            handleAddRec()
          }}>Recommend It</button> : ""}
    </article>
    <section className="media">
          </section> */}