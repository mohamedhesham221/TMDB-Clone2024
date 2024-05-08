import "./freeToWatch.css";
import { useEffect, useState } from "react";
import SwitcherBtn from "../SwitcherBtn/SwitcherBtn";
import PostersRow from "../PostersRow/PostersRow";
import API from '../../../Variables/vars';

// Component to render free to watch section
const FreeToWatch = () => {
  // Component logic ....
  const [currentState, changeCurrentState] = useState('movies');
  const [freeWatch, setFreeWatch] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] =  useState(null);

  const sectionName = "free-to-watch";
  const states = [
    {
      state: 'movies',
      text: 'Movies',
    },
    {
      state: 'tv',
      text: 'TV'
    }
  ]
  useEffect(() => {
    const urls = [
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API.key}`,
      `https://api.themoviedb.org/3/tv/airing_today?api_key=${API.key}`];
    Promise.all(urls.map((url) => fetch(url).then((res) => res.json()))).then(([movies, tvs]) => {
      if (currentState === 'movies') {
        setFreeWatch(movies.results);
      } else {
        setFreeWatch(tvs.results);
      }
    }).catch((err) => {
      setError(err.message)
    }).finally(() => {
      setIsLoading(false);
    })
  }, [currentState])
  return (
    <>
      <div className="free-watch-wrapper">
        <section>
          <h2 className="section-heading">Free To Watch </h2>
          <SwitcherBtn
            states={states} currentState={currentState}
            newState={changeCurrentState} sectionName={sectionName} />
          <PostersRow posters={freeWatch} sectionName={sectionName} error={error} isLoading={isLoading} />
        </section>
      </div>
    </>
  )
}
export default FreeToWatch;