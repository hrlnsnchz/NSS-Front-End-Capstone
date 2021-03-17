import {Link} from "react-router-dom"

export const MediaCard = ({media}) => {
    return (
        <section className="mediaCard">
            <h3><Link to={`/detail/${media.id}`}>
          { media.name }
        </Link></h3>
        </section>
    )
}