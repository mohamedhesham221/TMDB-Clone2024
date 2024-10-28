import { useParams } from "react-router";
import { useEffect, useState } from "react";
import MoviesTVsList from "../../components/MoviesTvs/MoviesTVsList";
import API from "../../Variables/vars";

//Component to render movies and TV shows data depends on params in URL
const ContainerMoviesTvs = () => {
  const { parentPath, childPath } = useParams();
  const [dataList, setDataList] = useState([]);
  const [genresArr, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] =  useState(false);

  const childPathsMovie = {
    "popular": "Popular",
    "top_rated": "Top Rated",
    "upcoming": "Upcoming",
    "now_playing": "Now Playing"
  }
  const childPathsTv = {
    "popular": "Popular",
    "top_rated": "Top Rated",
    "on_the_air": "Currently Airing",
    "airing_today": "Airing Today"
  }
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    //Function to get movies and TV shows list
    (async function getList() {
      try {
        const res = await fetch(`${API.baseURL}${parentPath === "movies" ? "movie" : "tv"}/${childPath}?api_key=${process.env.REACT_APP_API_KEY}`,{signal})
        const list = await res.json();
        setDataList(list.results);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch Aborted")
        }
        setError(error.message);
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    })();
    //Function to get genries list
    (async function getGenres () {
      try {
        const res = await fetch(`${API.baseURL}genre/${parentPath === "movies" ? "movie" : "tv"}/list?api_key=${process.env.REACT_APP_API_KEY}`,{signal})
        const genres = await res.json();
        setGenres(genres.genres);
      } catch (error) {
        console.log(error)
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    })();
    return () => {
      abortController.abort();
      setIsLoading(true)
    }
  }, [parentPath, childPath])
  return (
    <>
    <main>
      <div className="page-body">
      <h1 className="page-title">{parentPath === "movies" ? childPathsMovie[childPath] + " Movies" : childPathsTv[childPath] + " TV Shows"}</h1>
      <MoviesTVsList dataList={dataList} genres = {genresArr} parentPath={parentPath} error={error} isLoading={isLoading}/>
      </div>
    </main>
    </>
  )
}
export default ContainerMoviesTvs;