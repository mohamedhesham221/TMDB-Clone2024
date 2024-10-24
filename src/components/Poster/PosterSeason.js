import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,faCalendarDays, faCircle } from "@fortawesome/free-solid-svg-icons";
import API from '../../Variables/vars';
import { useEffect, useState } from "react";

// Component to render season details only for TV show poster
// Props:-
// parent: parent: string for root path in URL
// poster: object for all poster details
// months: array for all year months
const PosterSeason = ({parent, poster, months}) => {
  // Component Logic ...
  const [currentSeason, setCurrentSeason] = useState()
  useEffect(() => {
    (function () {
      
        const currSeason = poster?.seasons?.slice(-1)[0]
        return setCurrentSeason(currSeason)
    
    })()
  },[parent, poster?.seasons])
  return(
    <>
    {parent === "tv" ?
    <section className='poster-current-season'>
      <h2 className='section-header'>{poster?.type === "Miniseries" ? "Miniseries" : "Current Season"}</h2>
      <div className='poster-season'>
        <div className='season-img'>
          <img src={currentSeason?.poster_path? API.posterURL + currentSeason?.poster_path : API.posterURL + poster?.poster_path}
            alt={currentSeason?.name} loading='lazy' />
        </div>
        <div className='season-content'>
          <p className='season-head'>{currentSeason?.name}</p>
          <p className='season-info'>

            <span className='season-rate'>
              <FontAwesomeIcon icon={faStar} color='#fff' width="10px" style={{marginRight: "5px"}}/>
              {Math.round(currentSeason?.vote_average).toFixed(1)}</span>&nbsp;
            {new Date(currentSeason?.air_date).getFullYear()}
            <FontAwesomeIcon icon={faCircle} width="5px" style={{margin: "0 5px"}}/>
            {currentSeason?.episode_count + " Episodes"}
          </p>
          <p className='season-overview'>
            {currentSeason?.overview.length ?
              currentSeason?.overview : poster?.overview}
          </p>
          {poster?.last_episode_to_air ?
            <p className='season-last-ep-date'>
              <FontAwesomeIcon icon={faCalendarDays} style={{marginRight: "5px"}}/>
              {poster?.last_episode_to_air?.name}
              <span>
                {`(${poster?.last_episode_to_air?.season_number}`}&times;
                {`${poster?.last_episode_to_air?.episode_number},
            ${months[new Date(poster?.last_episode_to_air?.air_date).getMonth()]}
            ${new Date(poster?.last_episode_to_air?.air_date).getDate() + 1}
            ${new Date(poster?.last_episode_to_air?.air_date).getFullYear()})`}
              </span>
              {
                poster?.last_episode_to_air?.episode_type &&
                <span className='episode-type'>
                  <span>Season</span>
                  <span>{poster?.last_episode_to_air?.episode_type}</span>
                </span>
              }
            </p>
            :
            ""
          }
        </div>
      </div>
    </section>
    :
    ""
  }</>
  )
}
// PosterSeason.propTypes = {
//   parent: PropTypes.string.isRequired,
//   poster: PropTypes.object.isRequired,
//   months: PropTypes.array.isRequired
// }
export default PosterSeason;