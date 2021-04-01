import {Link} from "react-router-dom"
import { testAPI } from "../../Settings"

export const MediaCard = ({media}) => {
    const imgSize = "w500"
    console.log(`${testAPI.baseURL}/${imgSize}/${media.poster_path}`)
    return (
        <section className="mediaCard">
            <h3>
          { media.title }
        </h3>
        <img src={`${testAPI.baseURL}/${imgSize}/${media.poster_path}`} alt={media.name, "poster"} ></img>
        </section>
    )
}