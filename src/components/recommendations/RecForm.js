import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { MediaContext } from "../media/MediaProvider"
import { UserContext } from "../users/UserProvider"
import { RecCard } from "./RecCard"
import { RecContext } from "./RecProvider"
import "./Recommendations.css"


export const RecForm = () => {
    const {recs, getRecs, removeRec, updateRec } = useContext(RecContext)
    const {users, getUsers} = useContext(UserContext)
    const {media, getMedia} = useContext(MediaContext)
    const currentUser = parseInt(sessionStorage.getItem("app_user_id"))
    const sortedRecs = recs.sort((a, b)=> a.orderOfRecommend - b.orderOfRecommend)
    console.log('sortedRecs: ', sortedRecs);
    

    useEffect(() => {
        getUsers()
        .then(getMedia)
        .then(getRecs)
    }, [])
            
    
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
        userId: 0,
        mediaId: 0,
        orderOfRecommend: parseInt(recommendation.orderOfRecommend),
        id: 0
      })
      .then(() => history.push(`/profile`))
    }
    const history = useHistory()
    
    
    
    // Deleting
    const handleRemove = () => {
      removeRec()
      .then(() => {
        history.push("/profile")
      })
    }
    
          return (
            <>
              <h3>My List</h3>
              <ol className="recommendationList">
                {sortedRecs.map((r)=> {
                  return(
                    <li className="recommendation">
                  <div className="mediaName">{media.map((m) => {
                    if (r.mediaId === m.id) {
                      return m.name
                    }})}
                  </div>
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
                    )
            })}
              </ol>
              <button className="btn btn-primary"
                  onClick={event => {
                    event.preventDefault() 
                    handleSaveRec()
                  }}>
                  Save New Hierarchy</button>
      </>
)
}      