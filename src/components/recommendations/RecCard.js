import React, {useState, useContext, useEffect} from "react"
import { useHistory } from "react-router"
import {RecContext} from "./RecProvider"

export const RecCard = ({rec, listOwner, media}) => {
    const {getRecs, removeRec } = useContext(RecContext)
    // const currentUser = parseInt(sessionStorage())

    const [recs, setRecs] = useState({})
    const history = useHistory()

    useEffect(() => {
        getRecs()
    }, [])


    const handleRemove = () => {
        removeRec(rec.id)
          .then(() => {
            history.push("/profile")
          })
      }
     
    return (
        <section className="mediaCard">
            
        <div>{media.name}</div>
        <button onClick={handleRemove}>Remove Recommendation</button>
        </section>
    )
}
