import "./latestTrailers.css"
import { useState, useEffect, useRef } from "react";
import SwitcherBtn from "../SwitcherBtn/SwitcherBtn";
import API from '../../../Variables/vars';
import Backdrop from "../Backdrop/Backdrop";
import Trailer from '../../Trailer/Trailer';

// Component to render latest trailers videos 
const LatestTrailers = () => {
  // Component logic ...
  const [currentState, changeCurrentState] = useState('stream');
  const BG = useRef();
  const [trailer, setTrailer] = useState();
  const [isPlay, setPlayStatue] = useState(false);
  const [LatestTrailers, setLatestTrailers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const sectionName = 'trailers';
  const states = [
    {
      state: 'stream',
      text: 'Streaming',
    },
    {
      state: 'tv',
      text: 'On TV'
    },
    {
      state: 'theater',
      text: 'In Theaters'
    }
  ]

  useEffect(() => {
    const urls = [
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API.key}`,
      `https://api.themoviedb.org/3/tv/popular?api_key=${API.key}`];
    Promise.all(urls.map(url => fetch(url).then(res => res.json()))).then(([movies, tvs]) => {
      const allItems = [movies.results, tvs.results].flat()
      // detecting a random poster items
      for (let i = allItems.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let x = allItems[i];
        allItems[i] = allItems[j]
        allItems[j] = x;
      }
      // getting just 20 items
      const minimize = allItems.slice(0, 20)
      minimize.forEach((item) => {
        fetch(`${API.baseURL}${item.release_date ? 'movie' : 'tv'}/${item.id}/videos?api_key=${API.key}`)
          .then((res) => res.json()).then((data) => {
            if (data.results.length !== 0) {
              setLatestTrailers(LatestTrailers => [...LatestTrailers, item])
            }
          })
      })
    }).catch((err) => {
      setError(err.message);
    }).finally(() => setIsLoading(false))
  }, [])

  return (
    <>
      <div className="trailers-wrapper">
        <div className="latest-trailers">
          <div className="main-backdrop" ref={BG} style={{ background: `no-repeat center/cover url(${API.backdropURL + LatestTrailers[0]?.backdrop_path})` }}></div>
          <div className="backdrops">
            <section>
              <h2 className="section-heading">Latest Trailers</h2>
              <SwitcherBtn
                states={states} currentState={currentState}
                newState={changeCurrentState} sectionName={sectionName} />
              <div className="backdrops-wrapper">
                {error !== null && <div className="error">{error}</div>}
                {isLoading && <div className="loader">Is Loading, please wait . . . . . .</div>}

                {currentState === 'stream' ?
                  LatestTrailers.map((item, index) => {
                    return <Backdrop item={item} key={index} bgRef={BG} setTrailer={setTrailer} setPlayStatue={setPlayStatue} />
                  })
                  :
                  currentState === 'theater' ?
                    LatestTrailers.filter((item) => item.title).map((item, index) => {
                      return <Backdrop item={item} key={index} bgRef={BG} setTrailer={setTrailer} setPlayStatue={setPlayStatue} />
                    })
                    :
                    LatestTrailers.filter((item) => item.name).map((item, index) => {
                      return <Backdrop item={item} key={index} bgRef={BG} setTrailer={setTrailer} setPlayStatue={setPlayStatue} />
                    })
                }
              </div>
            </section>
          </div>
        </div>
      </div>
      <Trailer trailer={trailer} isPlay={isPlay} setPlayStatue={setPlayStatue} />
    </>
  )
}
export default LatestTrailers;