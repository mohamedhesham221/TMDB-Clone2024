import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import API from "../../Variables/vars";
import PropTypes from "prop-types";

// Component to render actor biography
// Props:-
// - actor: object to access to actor information
const ActorBiography = ({ actor }) => {
  // Component logic ...
  const slicedBiography = actor?.biography.slice(0, 700);
  const restOfBio = actor?.biography.slice(701, actor?.biography.length)
  const [allBio, setAllBio] = useState(false);
  const [all, setAll] = useState();
  const [movieActing, setMovieActing] = useState([]);
  const [tvActing, setTvActing] = useState([]);
  const [filterVal, setFilterVal] = useState("All");

  useEffect(() => {
    const filterMovieCredits = actor?.movie_credits?.cast?.filter((credit) => credit.release_date?.length)
    const filterTvCredits = actor?.tv_credits?.cast?.filter((credit) => credit.first_air_date?.length)

    function allCredits() {
      const mergedAllCredits = filterMovieCredits?.concat(filterTvCredits);
      const collectCreditsData = [];
      mergedAllCredits?.forEach((item, i) => {
        collectCreditsData.push({
          creditName: `${item.release_date ? item.title : item.name}`,
          releaseYear: `${item.release_date ?
            new Date(item.release_date).getFullYear() :
            new Date(item.first_air_date).getFullYear()}`,
          characterName: item.character
        })
      });
      setAll(collectCreditsData)
    }
    function movieCredits() {
      setMovieActing(filterMovieCredits);
    }
    function tvCredits() {
      setTvActing(filterTvCredits);
    }
    (function checkFilterVal() {
      if (filterVal === "Movies") {
        movieCredits();
      } else if (filterVal === "TV Shows") {
        tvCredits();
      } else {
        allCredits();
      }
    })();

  }, [actor?.movie_credits?.cast, actor?.tv_credits?.cast, filterVal])
  return (
    <>
      <div className="actor-bio">
        <p className="name-desktop actor-name">{actor?.name}</p>
        <p className="header">Biography</p>
        <pre className="bio">{actor?.biography.length > 700 && !allBio ?
          slicedBiography : slicedBiography + restOfBio}
          {!allBio && <button className="see-more" onClick={() => {
            setAllBio(true)
          }}>Read More <span> <FontAwesomeIcon icon={faChevronRight} /></span></button>}
        </pre>
        <p className="actor-credits-head">Known For</p>
        <div className="credits-row">
          {actor?.movie_credits?.cast.filter((movie) => movie.vote_average >= 7).map((movie, index) => {
            return index <= 8 && <div className="credit" key={index}>
              <img src={API.posterURL + movie.poster_path} alt={movie.title} />
              <p>{movie.title}</p>
            </div>
          })}
        </div>
        <div className="acting">
          <div className="head-wrapper">
            <p className="actor-acting-head">Acting</p>
            <div className="filter-acting-list">
              <div className="acting-filter">
                <button>
                  {filterVal}
                  <FontAwesomeIcon icon={faChevronDown} />
                </button>
                <ul className="acting-filter-items">
                  <li onClick={() => setFilterVal("Movies")}>Movies</li>
                  <li onClick={() => setFilterVal("TV Shows")}>TV Shows</li>
                  <li onClick={() => setFilterVal("All")}>All</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="acting-items">
            {filterVal === "Movies" ?
              movieActing.sort((a, b) => {
                return new Date(b.release_date).getFullYear() - new Date(a.release_date).getFullYear()
              }).map((item, index) => {
                return <div className="acting-item" key={index}>
                    <div className="acting-info">
                  <p className="acting-year">{new Date(item.release_date).getFullYear()}</p>
                  <FontAwesomeIcon icon={faCircle} />
                  <p className="acting-name">{item.title} <br /> <span>as {item.character}</span></p>
                  </div>
                  {
                    index !== movieActing.length - 1 && new Date(item.release_date).getFullYear() !== new Date(movieActing[index + 1]?.release_date).getFullYear() ?
                      <hr /> : ''
                  }
                </div>
              })
              :
              filterVal === "TV Shows" ? 
                tvActing.sort((a, b) => {
                  return new Date(b.first_air_date).getFullYear() - new Date(a.first_air_date).getFullYear()
                }).map((item, index) => {
                  return <div className="acting-item" key={index}>
                    <div className="acting-info">
                    <p className="acting-year">{new Date(item.first_air_date).getFullYear()}</p>
                    <FontAwesomeIcon icon={faCircle} />
                    <p className="acting-name">{item.name} <br /> <span>as {item.character}</span></p>
                    </div>
                    {
                      index !== tvActing.length - 1 && new Date(item.first_air_date).getFullYear() !== new Date(tvActing[index + 1]?.first_air_date).getFullYear() ?
                        <hr /> : ''
                    }
                  </div>
                })
                :
                all?.sort((a, b) => {
                  return b.releaseYear - a.releaseYear
                }).map((item, index) => {
                  return <div className="acting-item" key={index}>
                    <div className="acting-info">
                      <p className="acting-year">{item.releaseYear}</p>
                      <FontAwesomeIcon icon={faCircle} />
                      <p className="acting-name">{item.creditName} <br /> <span>as {item.characterName}</span></p>
                    </div>                    
                      {
                        index !== all.length - 1 && item.releaseYear !== all[index + 1]?.releaseYear ?
                          <hr /> : ''
                      }
                  </div>
                })
            }
          </div>
        </div>
      </div></>
  )
}
ActorBiography.propTypes = {
  actor : PropTypes.object.isRequired
}
export default ActorBiography;