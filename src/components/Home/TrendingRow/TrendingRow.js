import "./trendingRow.css"
import { useEffect, useState } from "react";
import API from '../../../Variables/vars'; 
import PostersRow from "../PostersRow/PostersRow";
import SwitcherBtn from "../SwitcherBtn/SwitcherBtn";

// Comopnent to render rows of trending posters
const TrendingRow = () => {
  // Component logic ....
  const [currentState, changeCurrentState] = useState('today');
  const [trendingPosters, setTrendingPosters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] =  useState(null);

  const sectionName = 'trending';
  const states = [
    {
      state: 'today',
      text: 'Today'
    },
    {
      state: 'week',
      text: 'This Week'
    }
  ]

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    (async function getTrendingData() {
      try {
        const res = await fetch(`${API.baseURL}trending/all/${currentState === 'today'? 'day' : 'week'}?api_key=${process.env.REACT_APP_API_KEY}`,{signal});
        const data = await res.json()
        setTrendingPosters(data.results)
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch Aborted")
          return;
        }
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    })()
  }, [trendingPosters, currentState])
  return (
    <>
      <div className="trending-wrapper">
        <section>
          <h2 className="section-heading">Trending</h2>
          <SwitcherBtn states={states} currentState={currentState} newState= {changeCurrentState} sectionName= {sectionName}/>
          <PostersRow  posters ={trendingPosters} sectionName ={sectionName} error={error} isLoading={isLoading}/>
        </section>
      </div>
    </>
  )
}
export default TrendingRow;