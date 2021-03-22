import React, {useState, useContext, useEffect} from "react"
import { useHistory } from "react-router"
import {RecContext} from "./RecProvider"

export const RecCard = ({recObject, listOwner, media}) => {
    const {getRecs, removeRec, updateRec } = useContext(RecContext)
    // const currentUser = parseInt(sessionStorage())

    const [recommendation, setRec] = useState({
      "userId": 0,
      "mediaId": 0,
      "orderOfRecommend": 0
    })

    const handleControlledInputChange = (event) => {
      const newRec = { ...recommendation }
      newRec[event.target.id] = event.target.value
      setRec(newRec)
    }

    const handleSaveRec = () => {
          updateRec({
              userId: recObject.userId,
              mediaId: parseInt(recObject.mediaId),
              orderOfRecommend: parseInt(recommendation.orderOfRecommend),
              id: recObject.id
          })
          .then(() => history.push(`/profile`))
        }
    const history = useHistory()

    useEffect(() => {
        getRecs()
    }, [])

// Deleting
    const handleRemove = () => {
        removeRec(recObject.id)
          .then(() => {
            history.push("/profile")
          })
      }
     
    return (
      <>
        <li>
        <div className="mediaName">{media.name}</div>
        <button onClick={handleRemove}>Remove Recommendation</button>
        <fieldset>
          <div className="form-group">
            <label htmlFor="recommendationRank">New Rank: </label>
            <input type="text" id="orderOfRecommend" required className="form-control"
            placeholder="Enter a Number"
            onChange={handleControlledInputChange}
            value={recommendation.orderOfRecommend}/>
          </div>
        </fieldset>
        </li>
        <button className="btn btn-primary"
          onClick={event => {
            event.preventDefault() 
            handleSaveRec()
          }}>
        Save New Hierarchy</button>
      </>  
    )
}