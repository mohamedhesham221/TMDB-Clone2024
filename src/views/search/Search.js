import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import API from '../../Variables/vars';
import FooterComp from '../../components/Footer/FooterComp';
import Pagination from "../../components/Pagination/Pagination";
import SearchForm from "../../components/Search/SearchForm";
import SearchResult from "../../components/Search/SearchResult";
//This component displays a serach form and search result from user input
const Search = () => {
  //Component logic ...
  const location = useLocation();
  const [searchResult, setSearchResult] = useState([]);
  const [currentQuery, setcurrentQuery] = useState(location.state?.query);
  const inpRef = useRef('');
  const [pageNum, setPageNum] = useState(1);
  const [moviesNums, setMoviesNums] = useState(0);
  const [tvsNums, setTvsNums] = useState(0);
  const [peopleNums, setPeopleNums] = useState(0)
  const [mediaType, setMediaType] = useState('tvs');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    //Function to render search result and filter it depends on media type
    (async function getQueryResult () {
      try {
      const res = await fetch(`${API.baseURL}/search/multi?query=${currentQuery}&page=${pageNum}&api_key=${API.key}`,{signal});
      const data = await res.json();
      setSearchResult(data.results)
      const categoryLens = {
        movies: data.results.filter((item) => item.media_type === 'movie'),
        tvs: data.results.filter((item) => item.media_type === 'tv'),
        people: data.results.filter((item) => item.media_type === 'person') 
      }
        setMoviesNums(categoryLens.movies.length);
        setTvsNums(categoryLens.tvs.length);
        setPeopleNums(categoryLens.people.length);
      } catch (error) {
        if (error.name === "AbortError") {
          console.error("Fetch Aborted")
        }
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    })()

    return () => {
      abortController.abort();
      setIsLoading(true);
    }
  }, [pageNum, moviesNums, tvsNums, peopleNums, currentQuery])
  //Function to update search query 
  const getInputVal = () => {
    setcurrentQuery(inpRef.current.value)
  }
  return (
    <>
      <div className="search-page">
        <SearchForm getInputVal={getInputVal} inpRef={inpRef} />
        <SearchResult mediaType={mediaType} setMediaType={setMediaType}
          tvsNums={tvsNums} moviesNums={moviesNums}
          peopleNums={peopleNums} searchResult={searchResult} error={error} isLoading={isLoading} />
        <Pagination pageNum={pageNum} setPageNum={setPageNum} />
        <FooterComp />
      </div>
    </>
  )
}
export default Search;