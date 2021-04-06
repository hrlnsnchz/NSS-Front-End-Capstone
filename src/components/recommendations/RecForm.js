import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { MediaContext } from "../media/MediaProvider"
import { UserContext } from "../users/UserProvider"
import { RecContext } from "./RecProvider"
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import "./Recommendations.css"
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'



export const RecForm = () => {
    const {recs, getRecs, removeRec, updateRec } = useContext(RecContext)
    const {getUsers} = useContext(UserContext)
    const {media, getMedia} = useContext(MediaContext)
    const currentUser = parseInt(sessionStorage.getItem("app_user_id"))
    
    
    const [sortedRecs, setSortedRecs] = useState([])

    useEffect(() => {
      getUsers()
      .then(getMedia)
      .then(getRecs)
    }, [])

    //Sorting recs after they are defined
      useEffect(() => {
        setSortedRecs(recs.sort((a, b) => a.orderOfRecommend - b.orderOfRecommend))
      }, [recs])

      // Changing order of recs
      const handleOrderChange = (newOrder, recObject) => {
        const recsToSort = sortedRecs.slice()
        //remove rec from it's current position
        const indexRecObject = recsToSort.indexOf(recObject)
        recsToSort.splice(indexRecObject, 1)
        //add rec in the new position
        recsToSort.splice(newOrder - 1, 0, recObject)
        //loop through and change orderOfRecommend for all recs
        for (let i = 0; i < recsToSort.length; i++) {
          recsToSort[i].orderOfRecommend = i + 1
        }
        console.log(recsToSort)
        setSortedRecs(recsToSort)
      }

      const history = useHistory()

      // Saving
    const handleSaveRec = () => {
        const recsPromiseArray = sortedRecs.map(rec => {
          return updateRec((rec))
        })
        Promise.all(recsPromiseArray)
          .then(() => history.push(`/profile`))
  }
    

    
    // Deleting
    const handleRemove = (event) => {
        removeRec(event)
          .then(() => {
            history.push("/profile")
          })
      }
    

    const [results, setResults] = useState([])
    

    const imgSize = "w500" //URL param

    useEffect(()=> {
        setResults(media.results)
    }, [media]) //need to get results from media after initial render
    
          return (
            <>
              <h3 className="recListHeader">My Recommendations</h3>
              <ol className="recommendationList">
                {sortedRecs.map((r)=> {
                  if (r.userId === currentUser) {
                  return(
                    <li className="recommendation" key={r.id}>
                      <Card style={{ width: '8rem' }}>

                      <a href={`/detail/${r.mediaId}/${r.mediaType}`}>
                      <Card.Img variant="top" src={`http://image.tmdb.org/t/p/${imgSize}/${r.posterPath}`} alt={r.mediaTitle, " ", "poster"} />
                      </a>
                  <Form>
                  <Form.Row className="align-items-center">
                  <Col xs="auto">
                    <Form.Control
                    type="text" id={"orderOfRecommend", r.id} required className="form-control" size="sm"
                    placeholder="Edit Rank"
                    onChange={(event) => event.target.value !== "" && handleOrderChange(parseInt(event.target.value), r)} />
                    </Col>
                    </Form.Row>
                    </Form>
                      <Button variant="outline-danger" className="btn rec-delete" size="sm" id={r.id}
                      onClick={event => {
                        event.preventDefault() 
                        handleRemove(parseInt(r.id))
                      }}>
                    Remove</Button>
                    </Card>
                  </li>
                    )
                  }
                  })}
              </ol>
                <Button variant="outline-success" className="btn rec-save" size="sm"
                  onClick={event => {
                    event.preventDefault() 
                    handleSaveRec()
                  }}>
                  Save Changes</Button>
      </>
)
}
