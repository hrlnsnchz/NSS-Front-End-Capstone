import {Link} from "react-router-dom"
import { testAPI } from "../../Settings"

export const MediaCard = ({media}) => {
    const imgSize = "w500"
    return (
        <>
        <section className="mediaCard">
        <a href={`/detail/${media.id}/${media.media_type}`}>

        <img className="mediaCard__image" src={`http://image.tmdb.org/t/p/${imgSize}/${media.poster_path}`} alt={media.name, "poster"} ></img>
        </a>
        </section>
        </>
    )
}