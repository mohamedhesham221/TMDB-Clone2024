import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../Variables/vars';
import Trailer from '../../components/Trailer/Trailer';
import FooterComp from "../../components/Footer/FooterComp";
const PosterDetails = React.lazy(() => import("../../components/Poster/PosterDetails"))
//This component displays a specific poster information
const PosterInfo = () => {
  //Component logic ...

  const { parent, id } = useParams();
  const [poster, setPoster] = useState({})
  const rate = poster?.vote_average === undefined ? 0 : Math.round(poster?.vote_average * 10);
  const [fullYear, setFullYear] = useState("");
  const [currentColor, setCurrentColor] = useState();
  const [currentBaseColor, setCurrentBaseColor] = useState();
  const [isPlay, setPlayStatue] = useState(false)
  const [trailer, setTrailer] = useState()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    //Function to render movie information depends on ID
    const getMovieDetails = async (movieId) => {
      try {
        const res = await fetch(`${API.baseURL}movie/${movieId}?api_key=${API.key}&append_to_response=videos,credits,images,keywords,external_ids,reviews`, { signal })
        const movie = await res.json();
        setPoster(movie);
      } catch (error) {
        if (error.name === "AbortError") {
          console.error("Fetch Abort");
        }
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    //Function to render TV show information depends on ID
    const getTvDetails = async (tvId) => {
      try {
        const res = await fetch(`${API.baseURL}tv/${tvId}?api_key=${API.key}&append_to_response=videos,credits,images,keywords,external_ids,reviews`, { signal })
        const tv = await res.json();
        setPoster(tv);
      } catch (error) {
        if (error.name === "AbortError") {
          console.error("Fetch Abort");
        }
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }
    //Function to check if this ID for movie or tv to render one of them
    (function checkId() {
      if (parent === "movie") {
        getMovieDetails(id)
      } else {
        getTvDetails(id)
      }
    })();
    (function getReleaseDate() {
      if (parent === "movie") {
        const date = new Date(poster?.release_date)
        setFullYear(date.getFullYear());
      } else {
        const date = new Date(poster?.first_air_date)
        setFullYear(date.getFullYear());
      }
    })();
    (function setColorRate() {
      const colors = {
        hightRate: '#21d07a',
        hightRateBase: '#003d20ce',
        midRate: '#d2d531',
        midRateBase: '#3a3b00e0',
        lowRate: '#db2360',
        lowRateBase: '#460017cb'
      }
      if (rate > 0 && rate <= 50) {
        setCurrentColor(colors.lowRate)
        setCurrentBaseColor(colors.lowRateBase)
      } else if (rate > 50 && rate <= 70) {
        setCurrentColor(colors.midRate)
        setCurrentBaseColor(colors.midRateBase)
      } else if (rate > 70) {
        setCurrentColor(colors.hightRate)
        setCurrentBaseColor(colors.hightRateBase)
      } else {
        setCurrentColor("#000")
        setCurrentBaseColor("#000")
      }

      return () => {
        abortController.abort();
        setIsLoading(true)
      }
    })();

  }, [poster?.first_air_date, poster?.release_date, id, parent, rate, poster?.id])
  //Function to send trailer video to trailer component
  const sendToTrailerComp = () => {
    const filterd = poster?.videos?.results.filter((t) => t.type === 'Trailer');
    setTrailer(filterd[0])
    setPlayStatue(true)
  }
  return (
    <>
      <main>
        <div className='poster-page'>
          {error !== null && <div className="error">{error}</div>}
          {isLoading && <div className="loader">Is Loading, please wait . . .</div>}
          <Suspense>
            <PosterDetails parent={parent} poster={poster} fullYear={fullYear} currentColor={currentColor}
              currentBaseColor={currentBaseColor} rate={rate}
              sendToTrailerComp={sendToTrailerComp} sectionRef={sectionRef} />
          </Suspense>
        </div>
      </main>
      <Trailer trailer={trailer} isPlay={isPlay} setPlayStatue={setPlayStatue} />
      <FooterComp />

    </>
  )
}
export default PosterInfo;