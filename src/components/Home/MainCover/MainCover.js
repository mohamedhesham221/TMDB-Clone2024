import "./mainCover.css"
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import API from '../../../Variables/vars';
// Component to render top main cover in home page with random background in every refreash and search input for search names, movies, TV shows
const MainCover = () => {
  // Component logic ...
  const [path, setPath] = useState('');
  const [searchQuery, changeSearchQuery] = useState('');
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] =  useState(null);
  const defaultCover = require("../../../assets/imgs/cover.jpg")
  const navigate = useNavigate();
  const inpRef = useRef();
  // Function to send search query to search page
  const toSearchPage = () => {
    navigate('search', {
      state: {
        query: searchQuery
      }
    })
  }
  //Function to cjange search query value
  const changeInputVal = () => {
    changeSearchQuery(inpRef.current.value)
    setIsInputEmpty(true)
  }
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    (async function fetchData() {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}`,{signal});
        const data = await res.json();
        const randomPath = Math.floor(Math.random() * data.results.length);
        // setting random background path
        setPath(data.results[randomPath]);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted")
          return;
        }
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    })()
  }, [])
  return (
    <>
      <div className="main-cover">
        <div className="cover-container">
          <div className='cover'
            style={{ 
              background: `no-repeat center / cover 
              url(${!isLoading || error !== null ?
                API.backdropURL + path.backdrop_path 
              :
              defaultCover
              })` }}></div>
        </div>
        <div className="first-layer">
          <section>
            <h1>Welcome.</h1>
            <p>Milion of movies, TV shows and people to discover. Explore now.</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              toSearchPage();
            }}>
              <fieldset>
                <input type="text" placeholder="Search..." ref={inpRef} onChange={() => changeInputVal()} />
              </fieldset>
              <button type="submit">
                <Link to={!isInputEmpty? '/': 'search'}>Search</Link>
              </button>
            </form>
          </section>
        </div>
        <div className="second-layer"></div>
      </div>
    </>
  )
}
export default MainCover;