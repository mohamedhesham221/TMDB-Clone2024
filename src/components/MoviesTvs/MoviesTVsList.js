import "./moviesTVsList.css";
import PropTypes from "prop-types";
import Poster from "../Poster/Poster";
import API from "../../Variables/vars";
import { useEffect, useRef, useState } from "react";
import MobilePoster from "./MobilePoster";
import MoviesTVsWidget from "./MoviesTvsWidget";
// Component to render movies or TVs list items
// Props:-
// - dataList: array of movies or tvs data 
// - genres: array of genres name
// - parentPath: string to detect which parent (movie or tv)
// - error: bool to check if response succede or not
// - isLoading: bool to check if response still fetching or not 

const MoviesTVs = ({ dataList, genres, parentPath, error, isLoading }) => {
  // Component logic ....
  const [postersList, setPostersList] = useState([]);
  const [filterPosters, setFilterPosters] = useState([])
  const [selectVal, setSelectVal] = useState("popularity-descending")
  const [isActive, setIsActive] = useState(false);
  const inptRef = useRef();

  useEffect(() => {
    setPostersList(dataList)
  }, [dataList])
  return (
    <>
      <div className="posters-list-wrapper">
        <MoviesTVsWidget selectVal={selectVal} setSelectVal={setSelectVal} inptRef={inptRef} genres={genres} isActive={isActive} setIsActive={setIsActive} dataList={dataList} setPostersList={setPostersList} setFilterPosters={setFilterPosters}
        parentPath={parentPath} />
        <div className="posters-list">
          {error !== null && <div className="error">{error}</div>}
          {isLoading && <div className="loader">Is Loading, please wait . . .</div>}
          {
            selectVal === "popularity-ascending" ?
              //**Popularity Ascending** */
              filterPosters.length ?
                filterPosters.sort((a, b) => {
                  return a.popularity - b.popularity
                }).map((el) =>
                  window.innerWidth <= 600 ?
                    <MobilePoster imgPath={API.posterURL} poster={el} parentPath={parentPath} key={el.id} /> :
                    <Poster imgPath={API.posterURL} poster={el} key={el.id} />)
                :
                postersList.sort((a, b) => {
                  return a.popularity - b.popularity
                }).map((el) =>
                  window.innerWidth <= 600 ?
                    <MobilePoster imgPath={API.posterURL} poster={el} key={el.id} /> :
                    <Poster imgPath={API.posterURL} poster={el} key={el.id} />)
              //*************************************** */
              :
              selectVal === "popularity-descending" ?
                //**Popularity Descending*** */
                filterPosters.length ?
                  filterPosters.sort((a, b) => {
                    return b.popularity - a.popularity
                  }).map((el) =>
                    window.innerWidth <= 600 ?
                      <MobilePoster imgPath={API.posterURL} poster={el} parentPath={parentPath} key={el.id} /> :
                      <Poster imgPath={API.posterURL} poster={el} key={el.id} />) :
                  postersList.sort((a, b) => {
                    return b.popularity - a.popularity
                  }).map((el) =>
                    window.innerWidth <= 600 ?
                      <MobilePoster imgPath={API.posterURL} poster={el} parentPath={parentPath} key={el.id} /> :
                      <Poster imgPath={API.posterURL} poster={el} key={el.id} />)
                //*************************************** */
                :
                selectVal === "rate-ascending" ?
                  //**Rate Ascending*** */
                  filterPosters.length ?
                    filterPosters.sort((a, b) => {
                      return a.vote_average - b.vote_average
                    }).map((el) =>
                      window.innerWidth <= 600 ?
                        <MobilePoster imgPath={API.posterURL} poster={el} parentPath={parentPath} key={el.id} /> :
                        <Poster imgPath={API.posterURL} poster={el} key={el.id} />) :
                    postersList.sort((a, b) => {
                      return a.vote_average - b.vote_average
                    }).map((el) =>
                      window.innerWidth <= 600 ?
                        <MobilePoster imgPath={API.posterURL} poster={el} parentPath={parentPath} key={el.id} /> :
                        <Poster imgPath={API.posterURL} poster={el} key={el.id} />)
                  //*************************************** */
                  :
                  selectVal === "rate-descending" ?
                    //**Rate Descending** */
                    filterPosters.length ?
                      filterPosters.sort((a, b) => {
                        return b.vote_average - a.vote_average
                      }).map((el) =>
                        window.innerWidth <= 600 ?
                          <MobilePoster imgPath={API.posterURL} poster={el} parentPath={parentPath} key={el.id} /> :
                          <Poster imgPath={API.posterURL} poster={el} key={el.id} />) :
                      postersList.sort((a, b) => {
                        return b.vote_average - a.vote_average
                      }).map((el) =>
                        window.innerWidth <= 600 ?
                          <MobilePoster imgPath={API.posterURL} poster={el} parentPath={parentPath} key={el.id} /> :
                          <Poster imgPath={API.posterURL} poster={el} key={el.id} />)
                    //*************************************** */
                    :
                    selectVal === "date-ascending" ?
                      //**Date Ascending** */
                      filterPosters.length ?
                        filterPosters.sort((a, b) => {
                          return parentPath === "tv_shows" ? new Date(a.first_air_date).getTime() - new Date(b.first_air_date).getTime()
                            : new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
                        }).map((el) =>
                          window.innerWidth <= 600 ?
                            <MobilePoster imgPath={API.posterURL} poster={el} parentPath={parentPath} key={el.id} /> :
                            <Poster imgPath={API.posterURL} poster={el} key={el.id} />) :
                        postersList.sort((a, b) => {
                          return parentPath === "tv_shows" ? new Date(a.first_air_date).getTime() - new Date(b.first_air_date).getTime()
                            : new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
                        }).map((el) =>
                          window.innerWidth <= 600 ?
                            <MobilePoster imgPath={API.posterURL} poster={el} parentPath={parentPath} key={el.id} /> :
                            <Poster imgPath={API.posterURL} poster={el} key={el.id} />)
                      //*************************************** */
                      :
                      selectVal === "date-descending" ?
                      //**Date Descending*** */
                        filterPosters.length ?
                          filterPosters.sort((a, b) => {
                            return parentPath === "tv_shows" ? new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime()
                              : new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
                          }).map((el) =>
                            window.innerWidth <= 600 ?
                              <MobilePoster imgPath={API.posterURL} poster={el} parentPath={parentPath} key={el.id} /> :
                              <Poster imgPath={API.posterURL} poster={el} key={el.id} />) :
                          postersList.sort((a, b) => {
                            return parentPath === "tv_shows" ? new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime()
                              : new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
                          }).map((el) =>
                            window.innerWidth <= 600 ?
                              <MobilePoster imgPath={API.posterURL} poster={el} parentPath={parentPath} key={el.id} /> :
                              <Poster imgPath={API.posterURL} poster={el} key={el.id} />)
                        //*************************************** */
                        :
                        selectVal === "a-z" ?
                          //**A to Z** */
                          filterPosters.length ?
                            filterPosters.sort((a, b) => {
                              return parentPath === "tv_shows" ? a.name?.localeCompare(b.name) : a.title?.localeCompare(b.title)
                            }).map((el) =>
                              window.innerWidth <= 600 ?
                                <MobilePoster imgPath={API.posterURL} poster={el} parentPath={parentPath} key={el.id} /> :
                                <Poster imgPath={API.posterURL} poster={el} key={el.id} />) :
                            postersList.sort((a, b) => {
                              return parentPath === "tv_shows" ? a.name?.localeCompare(b.name) : a.title?.localeCompare(b.title)
                            }).map((el) =>
                              window.innerWidth <= 600 ?
                                <MobilePoster imgPath={API.posterURL} poster={el} parentPath={parentPath} key={el.id} /> :
                                <Poster imgPath={API.posterURL} poster={el} key={el.id} />)
                          //*************************************** */
                          :
                          selectVal === "z-a" ?
                            //**Z to A** */
                            filterPosters.length ?
                              filterPosters.sort((a, b) => {
                                return parentPath === "tv_shows" ? a.name?.localeCompare(b.name) : a.title?.localeCompare(b.title)
                              }).reverse().map((el) =>
                                window.innerWidth <= 600 ?
                                  <MobilePoster imgPath={API.posterURL} poster={el} parentPath={parentPath} key={el.id} /> :
                                  <Poster imgPath={API.posterURL} poster={el} key={el.id} />) :
                              postersList.sort((a, b) => {
                                return parentPath === "tv_shows" ? a.name?.localeCompare(b.name) : a.title?.localeCompare(b.title)
                              }).reverse().map((el) =>
                                window.innerWidth <= 600 ?
                                  <MobilePoster imgPath={API.posterURL} poster={el} parentPath={parentPath} key={el.id} /> :
                                  <Poster imgPath={API.posterURL} poster={el} key={el.id} />)
                            //*************************************** */
                            :
                            ""
          }
        </div>
      </div>
    </>
  )
}
MoviesTVs.propTypes = {
  dataList: PropTypes.array.isRequired,
  genres: PropTypes.array.isRequired,
  parentPath: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
}

export default MoviesTVs;