import { useContext } from 'react';
import { Context } from "../../context/context";
import API from '../../Variables/vars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from 'react';
import PosterSeason from './PosterSeason';

// Component to render reviews, videos, cast, posters, backdrops for poster of movie or TV show
const PosterInfoBody = () => {
  //Compoent logic ....
  const { parent, poster, sectionRef } = useContext(Context);
  const reviews = poster.reviews?.results;
  const initReview = poster.reviews?.results[0];
  const backdrops = poster.images?.backdrops;
  const posters = poster.images?.posters;
  const videos = poster.videos?.results;
  const cast = poster.credits?.cast.slice(0, 10);
  const initMediaVideo = poster.videos?.results?.filter((t) => t.name.includes("Official Trailer")).map(t => t.key);
  const initMediaBackdrop = poster.images?.backdrops[0]?.file_path;
  const initMediaPoster = poster.images?.posters[0].file_path;
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novmber', 'December']
  const profileReviewer = require('../../assets/imgs/user-glyph.svg').default;
  const profileActor = require('../../assets/imgs/user-glyph.svg').default;
  const [veiwAllReveiw, setAllReview] = useState(false);
  const [activeMediaItem, setActiveMediaItem] = useState(1);
  const [mediaRowCurrentStatus, setMediaRowCurrentStatus] = useState('most-popular');
  const [randomReview, setRandomReview] = useState();
  const [dynamicHeight, setDynamicHeight] = useState();
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    //Function to make section height dynamic depends on poster description content
    (function castSectionDynamicHeight() {
      setDynamicHeight(sectionRef.current?.clientHeight)
    })();

  }, [sectionRef, sectionRef.current?.clientHeight])



  const getRandomReview = () => {
    setCounter(counter + 1)
    if (counter > reviews.length - 1) {
      setCounter(1)
      setRandomReview(reviews[0])
    } else {
      setRandomReview(reviews[counter])
    }
  }
  return (
    <>
      <div className='poster-body' style={{ marginTop: `${window.outerWidth >= 992 ? "25px" : dynamicHeight}px` }}>
        <section className='poster-media-cast'>
          <h2 className='section-header'>{parent === "movie" ? "Top Billed Cast" : "Series Cast"}</h2>
          <div className='poster-cast'>
            {cast?.map((actor, index) => {
              return <div className='actor' key={index}>
                <img src={actor.profile_path ? API.posterPersonURL + actor.profile_path : profileActor} alt={actor.name + " Picture"} loading='lazy' />
                <p className='cast-name'>{actor.name}</p>
                <p className='cast-role'>{actor.character}</p>
              </div>
            })
            }
          </div>
          <div className='section-divider'></div>
        </section>
            <PosterSeason parent={parent} poster={poster} months={months}/>
        <div className='section-divider' style={parent === "tv" ? { display: "block" } : { display: "none" }}></div>
        <section className='poster-media-reviews'>
          <h2 className='section-header'>Social
            <button onClick={() => getRandomReview()}>Reviews {reviews?.length}</button></h2>
          {
            reviews?.length === 0 ?
              <p>We don't have any reviews for {parent === "movie" ? poster?.title : poster?.name}.</p>
              :
              !randomReview ?
                <div className='poster-review'>
                  <div className='poster-review-author'>
                    <div className='author-profile'>
                      <img src={!initReview?.author_details.avatar_path ? profileReviewer
                        : API.posterPersonURL + initReview?.author_details.avatar_path}
                        alt={initReview?.author + "'s Picture"}
                        loading='lazy' />
                    </div>
                    <div className='author-name'>
                      <p>A review by {initReview?.author}</p>
                      <p>
                        {
                          initReview?.author_details.rating && <span className='rating'><FontAwesomeIcon icon={faStar} color='#fff' style={{ width: "10px" }} />&nbsp;
                            {initReview?.author_details.rating.toFixed(1)}</span>
                        }
                        &nbsp;Written by <span>{initReview?.author}</span> on &nbsp;
                        {months[new Date(initReview?.created_at).getMonth()] + " " +
                          new Date(initReview?.created_at).getDate() + ", " +
                          new Date(initReview?.created_at).getFullYear()
                        }
                      </p>
                    </div>
                  </div>
                  <div className='poster-review-content'>
                    <pre>
                      {initReview?.content.length > 450 && !veiwAllReveiw ?
                        initReview?.content.slice(0, 450)
                        : initReview?.content}
                      <button onClick={() => setAllReview(true)}>{initReview?.content.length > 450 && !veiwAllReveiw ? " ... read the rest" : ""}</button></pre>
                  </div>
                </div>
                :
                <div className='poster-review'>
                  <div className='poster-review-author'>
                    <div className='author-profile'>
                      <img src={!randomReview?.author_details.avatar_path ?
                        profileReviewer
                        :
                        API.posterPersonURL + randomReview?.author_details.avatar_path}
                        alt={randomReview?.author + "'s Picture"} loading='lazy' />
                    </div>
                    <div className='author-name'>
                      <p>A review by {randomReview?.author}</p>
                      <p>
                        {
                          randomReview?.author_details.rating &&
                          <span className='rating'>
                            <FontAwesomeIcon icon={faStar} color='#fff' style={{ width: "10px" }} />&nbsp;
                            {randomReview?.author_details.rating.toFixed(1)}
                          </span>
                        }
                        &nbsp;Written by <span>{randomReview?.author}</span> on &nbsp;
                        {months[new Date(randomReview?.created_at).getMonth()] + " " +
                          new Date(randomReview?.created_at).getDate() + ", " +
                          new Date(randomReview?.created_at).getFullYear()
                        }
                      </p>
                    </div>
                  </div>
                  <div className='poster-review-content'>
                    <pre>{randomReview?.content.length > 450 && !veiwAllReveiw ?
                      randomReview?.content.slice(0, 450)
                      : randomReview?.content}
                      <button onClick={() => setAllReview(true)}>{randomReview?.content.length > 450 && !veiwAllReveiw ? " ... read the rest" : ""}</button></pre>
                  </div>
                </div>
          }
        </section>
        <div className='section-divider'></div>
        <section className='poster-media-videos'>
          <div className='section-header-navigator'>

            <h2 className='section-header'>Media</h2>
            <div className='section-navigator'>
              <ul>
                <li>
                  <button className={`${activeMediaItem === 1 ? "active-item" : ""}`}
                    onClick={() => {
                      setActiveMediaItem(1);
                      setMediaRowCurrentStatus("most-popular")
                    }}>Most Popular</button>
                </li>
                <li>
                  <button className={`${activeMediaItem === 2 ? "active-item" : ""}`}
                    onClick={() => {
                      setActiveMediaItem(2);
                      setMediaRowCurrentStatus("videos")
                    }}>Videos</button>
                </li>
                <li>
                  <button className={`${activeMediaItem === 3 ? "active-item" : ""}`}
                    onClick={() => {
                      setActiveMediaItem(3);
                      setMediaRowCurrentStatus("posters")
                    }}>Posters</button>
                </li>
                <li>
                  <button className={`${activeMediaItem === 4 ? "active-item" : ""}`}
                    onClick={() => {
                      setActiveMediaItem(4);
                      setMediaRowCurrentStatus("backdrops")
                    }}>Backdrops</button>
                </li>
              </ul>
            </div>
          </div>
          {
            mediaRowCurrentStatus === "most-popular" ?
              <div className='media-row' style={{
                gridTemplateColumns: `repeat(${initMediaVideo?.length + 2}, ${window.outerWidth >= 992 ? "500px" : "350px"})`
              }}>
                {initMediaVideo?.map((vid, index) => {
                  return <iframe style={{ width: "100%" }} allowFullScreen src={API.youtubeURL + vid} title={vid?.name} key={index} />
                })}
                <img className='media-backdrop' src={API.backdropURL + initMediaBackdrop}
                  alt={parent === "movie" ? poster?.title : poster?.name + "'s Cover"} />
                <img className='media-poster' src={API.posterURL + initMediaPoster}
                  alt={parent === "movie" ? poster?.title : poster?.name + "'s Poster"} style={{ width: `${window.outerWidth >= 992 ? "40%" : "30%"}` }} />
              </div>
              :
              mediaRowCurrentStatus === "videos" ?
                <div className='media-row' style={{ gridTemplateColumns: `repeat(${videos?.length}, ${window.outerWidth >= 992 ? "450px" : "350px"})` }}>
                  {
                    videos?.map((vid, index) => {
                      return <iframe allowFullScreen src={API.youtubeURL + vid.key} title={vid?.name} key={index} />
                    })
                  }
                </div>
                :
                mediaRowCurrentStatus === "posters" ?
                  <div className='media-row' style={{ gridTemplateColumns: `repeat(6, ${window.outerWidth >= 992 ? "150px" : "100px"})` }}>
                    {
                      posters?.map((img, index) => {
                        return index <= 5 && <img className='media-poster' src={API.posterURL + img.file_path}
                          alt={parent === "movie" ? poster?.title : poster?.name + "'s Poster"} key={index} />
                      })
                    }
                  </div>
                  :
                  <div className='media-row' style={{ gridTemplateColumns: `repeat(6, ${window.outerWidth >= 992 ? "500px" : "350px"}` }}>
                    {
                      backdrops?.map((img, index) => {
                        return index <= 5 && <img className='media-backdrop' src={API.backdropURL + img.file_path}
                          alt={parent === "movie" ? poster?.title : poster?.name + "'s Cover"} key={index} />
                      })
                    }
                  </div>
          }
        </section>
      </div>

    </>
  )
}
export default PosterInfoBody;