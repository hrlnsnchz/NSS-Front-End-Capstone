import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import { MediaContext } from "../media/MediaProvider"
import { UserContext } from "../users/UserProvider"
import { RecContext } from "./RecProvider"
import "./Recommendations.css"


export const RecForm = () => {
    const {recs, getRecs, removeRec, updateRec } = useContext(RecContext)
    const {getUsers} = useContext(UserContext)
    const {media, getMedia} = useContext(MediaContext)
    // const currentUser = parseInt(sessionStorage.getItem("app_user_id"))
    
    const [sortedRecs, setSortedRecs] = useState([])

    useEffect(() => {
      getUsers()
      .then(getMedia)
      .then(getRecs)
    }, [])

      useEffect(() => {
        setSortedRecs(recs.sort((a, b) => a.orderOfRecommend - b.orderOfRecommend))
      }, [recs])


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

    const handleSaveRec = () => {
        const recsPromiseArray = sortedRecs.map(rec => {
          return updateRec((rec))
        })
        Promise.all(recsPromiseArray)
          .then(() => history.push(`/profile`))
  }
    
    
    
    // Deleting
    const handleRemove = (recObject) => {
      removeRec(recObject.id)
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
                  <button className="btn rec-delete"
                  onClick={event => {
                    event.preventDefault() 
                    handleRemove(r)
                  }}>
                  Delete Recommendation</button>
                  <fieldset>
                  <div className="form-group">
                    <label htmlFor="recommendationRank">New Rank: </label>
                    <input type="text" id="orderOfRecommend" required className="form-control"
                    placeholder="Enter a Number"
                    onChange={(event) => event.target.value !== "" && handleOrderChange(parseInt(event.target.value), r)}
                    />
                    </div>
                  </fieldset>
                  </li>
                    )
                  })}
              </ol>
              <button className="btn rec-save"
                  onClick={event => {
                    event.preventDefault() 
                    handleSaveRec()
                  }}>
                  Save New Hierarchy</button>
      </>
)
}      