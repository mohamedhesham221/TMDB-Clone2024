import "./mobilePoster.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
// Component to render poster of movie or tv only in mobile screen
// Props:-
// imgPath: string for adding base root to image in poster
// poster: object for containing poster info
// parentPath: string for check if poster is for TV or Movie
const MobilePoster = ({ imgPath, poster, parentPath }) => {
  // Component logic ....
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const navigate = useNavigate();
  const getDetails = () => {
    navigate(
      `${poster.first_air_date ?
        'tv' : 'movie'}/${poster.id}/${poster.first_air_date ?
        poster.name.replaceAll(" ","-"): poster.title.replaceAll(" ","-")}`, {
      state: {
        id: poster.id
      }
    })
  }

  return (
    <>
      <article>
        <div className="card" onClick={() => getDetails()}>
          <div className="card-image">
            <img src={imgPath + poster.poster_path} alt={parentPath === "tv" ? poster.name : poster.title + "'s poster"} />
          </div>
          <div className="card-content">
            <p className="card-content-title">{parentPath === "tv" ? poster.name : poster.title}</p>
            <p className="card-content-release">{`${months[new Date(parentPath === "tv" ? poster.first_air_date : poster.release_date).getMonth()]}
                                                          ${new Date(parentPath === "tv" ? poster.first_air_date : poster.release_date).getDate() + 1},
                                                          ${new Date(parentPath === "tv" ? poster.first_air_date : poster.release_date).getFullYear()}`}</p>
            <p className="card-content-overview">{!poster.overview ? "" : poster.overview.slice(0, 65) + "..."}</p>
          </div>
        </div>
      </article></>
  )
}
MobilePoster.propTypes = {
  imgPath: PropTypes.string.isRequired,
  poster: PropTypes.object.isRequired,
  parentPath: PropTypes.string.isRequired
}
export default MobilePoster;