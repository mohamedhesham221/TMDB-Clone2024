import "./popularTvsMovies.css"
import { useEffect, useState } from "react";
import SwitcherBtn from "../SwitcherBtn/SwitcherBtn";
import PostersRow from "../PostersRow/PostersRow";

// Component to render popular movies and TV shows posters
const PopularTvsMovs = () => {
  // Component logic ....
  const [currentState, changeCurrentState] = useState('stream');
  const [popularPosters, setPopularPosters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] =  useState(null);

  const sectionName = 'popular-tvs-movs';
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
    const urls = [`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}`,
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`]
    Promise.all(urls.map(url => fetch(url).then(res => res.json()))).then(([movies, tvs]) => {
      const allItems = [movies.results, tvs.results].flat()
      // detecting a random poster items
      for (let i = allItems.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let x = allItems[i];
        allItems[i] = allItems[j]
        allItems[j] = x;
      }
      (function handlePosters ()  {
        // getting just 20 items
        const minimize = allItems.slice(0, 20)
        switch (currentState) {
          case 'movie':
            setPopularPosters(minimize.filter((item) => item.title))
            break;
          case 'tv':
            setPopularPosters(minimize.filter((item) => item.name))
            break;
          default:
            setPopularPosters(minimize);
            break;
        }
      })();
    }).catch((err) => {
      setError(err.message)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [currentState])
  return (
    <>
      <div className="popular-wrapper">
        <section>
          <h2 className="section-heading">What's Popular</h2>
          <SwitcherBtn
            states={states} currentState={currentState}
            newState={changeCurrentState} sectionName={sectionName} />
          <PostersRow posters={popularPosters} sectionName={sectionName} error={error} isLoading={isLoading}/>
        </section>
      </div>
    </>
  )
}
export default PopularTvsMovs;