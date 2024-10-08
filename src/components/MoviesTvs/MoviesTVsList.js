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
  const [panelSortState, setPanelSortState] = useState(false);
  const [panelFilterState, setPanelFilterState] = useState(false);
  const [selectVal, setSelectVal] = useState("popularity-descending")
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [genresID, setGenresID] = useState([]);
  const [minValue, set_minValue] = useState(0);
  const [maxValue, set_maxValue] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [isDisabled, changeIsDisable] = useState(true);
  const inptRef = useRef();


  const handleSelectChange = (e) => {
    setSelectVal(e.target.value);
  }
  //Function to get start date value for input date
  const getStartDate = () => {
    setStartDate(inptRef.current.value)
    changeIsDisable(false)
  }
  const handleInputChange = (e) => {
    setEndDate(e.target.value)
  }
  // Function to filter data depends on dates 
  const filterByDate = () => {
    setPostersList(dataList.filter((el) => {
      return new Date(el.release_date).getTime() >= new Date(startDate).getTime()
        && new Date(el.release_date).getTime() <= new Date(endDate).getTime();
    }))
  }
  const addBtnID = (id) => {
    if (genresID.includes(id)) {
      genresID.splice(genresID.indexOf(id), 1);
    } else {
      setGenresID(genresID => [...genresID, id])
    }
  }
  const handleInputRange = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
    if (minValue > 0 || maxValue < 10) changeIsDisable(false)
  };
 // Function to filter data depends on genres
  const filterByGenre = () => {
    if (genresID.length) {
      setPostersList(dataList.filter((el) => {
        return el.genre_ids.find(id => genresID.includes(id))
      }))
    }
  }
   // Function to filter data depends on average score
  const filterByScore = () => {
    setPostersList(dataList.filter((el) => {
      return el.vote_average >= minValue && el.vote_average <= maxValue
    }))
  }

  useEffect(() => {
    (function currentDateFormat() {
      const YYYY = new Date().getFullYear();
      const MM = new Date().getMonth() + 1;
      const DD = new Date().getDate();
      const currentDate = `${YYYY}-${MM < 10 ? "0" + MM : MM}-${DD < 10 ? "0" + DD : DD}`;
      return setEndDate(currentDate)
    })()
    setPostersList(dataList)
  }, [dataList, genresID.length, maxValue, minValue, startDate.length])
  return (
    <>
      <div className="posters-list-wrapper">
        <MoviesTVsWidget panelSortState={panelSortState} setPanelSortState={setPanelSortState} selectVal={selectVal}
          handleSelectChange={handleSelectChange} panelFilterState={panelFilterState} setPanelFilterState={setPanelFilterState}
          inptRef={inptRef} getStartDate={getStartDate} endDate={endDate} handleInputChange={handleInputChange}
          genres={genres} genresID={genresID} isActive={isActive} setIsActive={setIsActive}
          addBtnID={addBtnID} isDisabled={isDisabled} changeIsDisable={changeIsDisable} minValue={minValue} maxValue={maxValue} handleInputRange={handleInputRange}
          filterByDate={filterByDate} filterByGenre={filterByGenre} filterByScore={filterByScore} />
        <div className="posters-list">
          {error !== null && <div className="error">{error}</div>}
          {isLoading && <div className="loader">Is Loading, please wait . . .</div>}
          {
            selectVal === "popularity-ascending" ?
              postersList.sort((a, b) => {
                return a.popularity - b.popularity
              }).map((el) =>
                window.innerWidth <= 600 ?
                  <MobilePoster imgPath={API.posterURL} poster={el} key={el.id} /> :
                  <Poster imgPath={API.posterURL} poster={el} key={el.id} />)
              :
              selectVal === "popularity-descending" ?
                postersList.sort((a, b) => {
                  return b.popularity - a.popularity
                }).map((el) =>
                  window.innerWidth <= 600 ?
                    <MobilePoster imgPath={API.posterURL} poster={el} parentPath={parentPath} key={el.id} /> :
                    <Poster imgPath={API.posterURL} poster={el} key={el.id} />)
                :
                selectVal === "rate-ascending" ?
                  postersList.sort((a, b) => {
                    return a.vote_average - b.vote_average
                  }).map((el) =>
                    window.innerWidth <= 600 ?
                      <MobilePoster imgPath={API.posterURL} poster={el} parentPath={parentPath} key={el.id} /> :
                      <Poster imgPath={API.posterURL} poster={el} key={el.id} />)
                  :
                  selectVal === "rate-descending" ?
                    postersList.sort((a, b) => {
                      return b.vote_average - a.vote_average
                    }).map((el) =>
                      window.innerWidth <= 600 ?
                        <MobilePoster imgPath={API.posterURL} poster={el} parentPath={parentPath} key={el.id} /> :
                        <Poster imgPath={API.posterURL} poster={el} key={el.id} />)
                    :
                    selectVal === "date-ascending" ?
                      postersList.sort((a, b) => {
                        return parentPath === "tv" ? new Date(a.first_air_date) - new Date(b.first_air_date)
                          : new Date(a.release_date) - new Date(b.release_date)
                      }).map((el) =>
                        window.innerWidth <= 600 ?
                          <MobilePoster imgPath={API.posterURL} poster={el} parentPath={parentPath} key={el.id} /> :
                          <Poster imgPath={API.posterURL} poster={el} key={el.id} />)
                      :
                      selectVal === "date-descending" ?
                        postersList.sort((a, b) => {
                          return parentPath === "tv" ? new Date(b.first_air_date) - new Date(a.first_air_date)
                            : new Date(b.release_date) - new Date(a.release_date)
                        }).map((el) =>
                          window.innerWidth <= 600 ?
                            <MobilePoster imgPath={API.posterURL} poster={el} parentPath={parentPath} key={el.id} /> :
                            <Poster imgPath={API.posterURL} poster={el} key={el.id} />)
                        :
                        selectVal === "a-z" ?
                          postersList.sort((a, b) => {
                            return parentPath === "tv" ? a.name.localeCompare(b.name) : a.title.localeCompare(b.title)
                          }).map((el) =>
                            window.innerWidth <= 600 ?
                              <MobilePoster imgPath={API.posterURL} poster={el} parentPath={parentPath} key={el.id} /> :
                              <Poster imgPath={API.posterURL} poster={el} key={el.id} />)
                          :
                          selectVal === "z-a" ?
                            postersList.sort((a, b) => {
                              return parentPath === "tv" ? a.name.localeCompare(b.name) : a.title.localeCompare(b.title)
                            }).reverse().map((el) =>
                              window.innerWidth <= 600 ?
                                <MobilePoster imgPath={API.posterURL} poster={el} parentPath={parentPath} key={el.id} /> :
                                <Poster imgPath={API.posterURL} poster={el} key={el.id} />)
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