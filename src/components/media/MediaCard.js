import {Link} from "react-router-dom"
import { testAPI } from "../../Settings"

export const MediaCard = ({media}) => {
    const imgSize = "w500"
    return (
        <section className="mediaCard">
            <h3><Link to={`/detail/${media.id}`}>
          { media.title }
        </Link></h3>
        <img src={`${testAPI.baseURL}/${imgSize}/${media.poster_path}`} alt={media.name, "poster"} ></img>
        </section>
    )
}