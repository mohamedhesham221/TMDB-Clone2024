import "./search.css";
import PropTypes from 'prop-types';
import API from '../../Variables/vars';
import { useNavigate } from "react-router-dom";

//Component to render search result list
//Props:
// - mediaType: string to filter search results
// - setMediaType: function to update string to filter search results
// - tvsNums: number for counting tvs shows
// - moviesNums: number for counting movies
// - peopleNums:number for counting people
// - searchResult: array for data come from API
// - error: boolean value to check if there is error in API response 
// - isLoading: boolean value to render loading message until component rendered
const SearchResult = ({ mediaType, setMediaType, tvsNums, moviesNums, peopleNums, searchResult, error, isLoading }) => {
  //Component logic ....
  const profileActor = require('../../assets/imgs/user-glyph.svg').default;
  const blankPoster = require('../../assets/imgs/picture-glyph.svg').default;
  // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const navigate = useNavigate();

  //Function to send data for movie or TV show to its own page and replace space to - in URL 
  const getDetails = (item) => {
    navigate(
      `${item.first_air_date ?
        'tv' : 'movie'}/${item.id}/${item.first_air_date ?
          item.name.replaceAll(" ", "-") : item.title.replaceAll(" ", "-")}`, {
      state: {
        id: item.id
      }
    })
  }
  return (
    <>
      <div className="search-result">
        <div className="widget">
          <aside>
            <p>Search Results</p>
            <ul>
              <li onClick={() => setMediaType('tvs')} className={mediaType === 'tvs' ? 'active' : ''}>
                TV Shows<span className={mediaType === 'tvs' ? 'active-span' : ''}>{tvsNums}</span>
              </li>
              <li onClick={() => setMediaType('movies')} className={mediaType === 'movies' ? 'active' : ''}>
                Movies<span className={mediaType === 'movies' ? 'active-span' : ''}>{moviesNums}</span>
              </li>
              <li onClick={() => setMediaType('people')} className={mediaType === 'people' ? 'active' : ''}>
                People<span className={mediaType === 'people' ? 'active-span' : ''}>{peopleNums}</span>
              </li>
            </ul>
          </aside>
        </div>
        <div className="search-items">
          {(error !== null && !searchResult.length) && <div className="error">{error} <br />
            there are no movies that matched your query</div>}
          {isLoading && <div className="loader">Is Loading, please wait . . .</div>}
          {
            mediaType === 'tvs' ?
              searchResult?.filter((item) => item.media_type === 'tv').map(
                (item) => <article key={item.id}>
                  <div className="card" onClick={() => getDetails(item)}>
                    <div className="card-image">
                      <img src={item.poster_path === null ? blankPoster : API.posterURL + item.poster_path} alt={item.name + "'s poster"} />
                    </div>
                    <div className="card-content">
                      <p className="card-content-title">{item.name}</p>
                      <p className="card-content-release">{`${item.first_air_date && new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }).format(new Date(item.first_air_date+"T00:00:00"))}`}</p>
                      <p className="card-content-overview">{!item.overview ? "" : item.overview.slice(0, 65) + "..."}</p>
                    </div>
                  </div>
                </article>
              )
              : mediaType === 'movies' ?
                searchResult.filter((item) => item.media_type === 'movie').map(
                  (item) => <article key={item.id}>
                    <div className="card" onClick={() => getDetails(item)}>
                      <div className="card-image">
                        <img src={item.poster_path === null ? blankPoster : API.posterURL + item.poster_path} alt={item.title + "'s poster"} />
                      </div>
                      <div className="card-content">
                        <p className="card-content-title">{item.title}</p>
                        <p className="card-content-release">{`${item.release_date && new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }).format(new Date(item.release_date+"T00:00:00"))}`}</p>   
                            <p className="card-content-overview">{!item.overview ? "" : item.overview.slice(0, 65) + "..."}</p>
                      </div>
                    </div>
                  </article>
                )
                :
                searchResult.filter((item) => item.media_type === 'person').map(
                  (item) => <article key={item.id}>
                    <div className="person-card">
                      <div className="person-card-image">
                        <img src={item.profile_path === null ? profileActor : API.posterURL + item.profile_path} alt={item.name + "'s poster"} />
                      </div>
                      <div className="person-card-content">
                        <p className="person-name">{item.name}</p>
                        <p className="person-details">
                          <span className="person-department">{item.known_for_department}</span>.
                          <span className="person-known-for">{
                            item.known_for?.map((k, i) => k.media_type === 'movie' ?
                              item.known_for.length === (i + 1) ? k.title : k.title + ", "
                              :
                              item.known_for.length === (i + 1) ? k.name : k.name + ", ")}</span></p>
                      </div>
                    </div>
                  </article>
                )
          }
        </div>
      </div>

    </>
  )
}
SearchResult.propTypes = {
  mediaType: PropTypes.string.isRequired,
  setMediaType: PropTypes.func.isRequired,
  tvsNums: PropTypes.number.isRequired,
  moviesNums: PropTypes.number.isRequired,
  peopleNums: PropTypes.number.isRequired,
  searchResult: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired
}
export default SearchResult;