import { useState, useEffect } from "react";
import "./moviesTvsWidget.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import MultiRangeSlider from "multi-range-slider-react";
// Component to render widget for movies or TVs page
// Props:-
// - selectVal: string value to sort items depends on value
// - handleSelectChange: function to change sort items depends on value
// - inptRef: object to detect date input value
// - genres: array for genres names
// - isActive: bool value to check if genre selected or not
// - setIsActive: function to update bool value
const MoviesTVsWidget = ({ inptRef, genres, isActive, setIsActive, setSelectVal, selectVal,
  dataList, setFilterPosters, parentPath, setPostersList }) => {
  // Component logic ....
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [genresID, setGenresID] = useState([]);
  const [panelSortState, setPanelSortState] = useState(false);
  const [panelFilterState, setPanelFilterState] = useState(false);
  const [minValue, set_minValue] = useState(0);
  const [maxValue, set_maxValue] = useState(10);
  const [isDisabled, changeIsDisable] = useState(true);

  //Function to handle select options
  const handleSelectChange = (e) => {
    setSelectVal(e.target.value);
  }
  //Function to get start date value for input date
  const handleStartDate = (e) => {
    setStartDate(e.target.value)
    changeIsDisable(false)
  }
  const handleEndDate = (e) => {
    setEndDate(e.target.value)
  }
  // Function to filter data depends on dates 
  const filterByDate = () => {
    setFilterPosters(dataList.filter(el => parentPath === "tv_shows" ?
      Date(el.first_air_date) >= new Date(startDate)
      && Date(el.first_air_date) <= new Date(endDate)
      :
      new Date(el.release_date) >= new Date(startDate)
      && new Date(el.release_date) <= new Date(endDate)
    ))
  }
  useEffect(() => {
    function currentDateFormat() {
      const YYYY = new Date().getFullYear();
      const MM = new Date().getMonth() + 1;
      const DD = new Date().getDate();
      const currentDate = `${YYYY}-${MM < 10 ? "0" + MM : MM}-${DD < 10 ? "0" + DD : DD}`;
      return setEndDate(currentDate)
    }
    currentDateFormat()
  }, [])

  //Function to get genre and filter data depends on genres
  const addBtnID = (id) => {
    if (genresID.includes(id)) {
      genresID.splice(genresID.indexOf(id), 1);
    } else {
      setGenresID(genresID => [...genresID, id])
    }
  }
  const filterByGenre = () => {
    if (genresID.length) {
      setFilterPosters(dataList.filter(el => el.genre_ids.find(id => genresID.includes(id))))
    }
  }
  useEffect(() => {
    if (genresID.length) {
      changeIsDisable(false)
    }
  }, [genresID.length])
  // Functions to handle and filter data depends on average score
  const handleInputRange = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
    if (minValue > 0 || maxValue < 10) changeIsDisable(false)
  };
  const filterByScore = () => {
    setFilterPosters(dataList.filter(el => el.vote_average >= minValue && el.vote_average <= maxValue))
    console.log("scoreFilter run")
  }
//Function to run filter
  const doFilter = () => {
    filterByDate();
    filterByGenre()
    filterByScore();
  }
  return (
    <>
      <div className="widget-filter">
        <aside>
          <div className={`sort-panel ${panelSortState ? 'open-panel' : ''}`}>
            <p>Sort
              <FontAwesomeIcon icon={faChevronRight}
                color="#000" className={`glyph-icon ${panelSortState ? 'sort-chev-rotate' : ''}`} onClick={() => setPanelSortState(!panelSortState)} />
            </p>
            <hr className="sorting-divide"/>
            <p>Sort Results By</p>
            <select value={selectVal} onChange={handleSelectChange}>
              <option value="popularity-ascending">Popularity Ascending</option>
              <option value="popularity-descending">Popularity Descending</option>
              <option value="rate-ascending">Rating Ascending</option>
              <option value="rate-descending">Rating Descending</option>
              <option value="date-ascending">Release Date Ascending</option>
              <option value="date-descending">Release Date Descending</option>
              <option value="a-z">Title (A-Z)</option>
              <option value="z-a">Title (Z-A)</option>
            </select>
          </div>
          <div className={`filter-panel ${panelFilterState ? 'open-panel' : ''}`}>
            <p>Filters
              <FontAwesomeIcon icon={faChevronRight}
                color="#000" className={`glyph-icon ${panelFilterState ? 'filter-chev-rotate' : ''}`} onClick={() => setPanelFilterState(!panelFilterState)} />
            </p>
            <hr className="filter-divide"/>
            <p>Release Dates</p>
            <form className="date-range">
              <fieldset>
                <div className="from">
                  <label htmlFor="start-date">from</label>
                  <input type="date" id="start-date" name="from-date" ref={inptRef} onChange={handleStartDate} />
                </div>
                <div className="to">
                  <label htmlFor="end-date">to</label>
                  <input type="date" id="end-date" name="to-date" value={endDate} onChange={handleEndDate} />
                </div>
              </fieldset>
              <hr className="dates-divide"/>
            </form>
            <div className="genres">
              <p>Genres</p>
              <div className="genres-button">
                {
                  genres.map((button) => {
                    return <button
                      className={`${genresID.includes(button.id) ? "active-btn" : ""} `}
                      key={button.id}
                      onClick={() => {
                        setIsActive(!isActive)
                        addBtnID(button.id)
                        changeIsDisable(false)
                      }}>
                      {button.name}
                    </button>
                  })
                }
              </div>
              <hr className="genres-divide"/>
            </div>
            <div className="user-score">
              <p>User Score</p>
              <MultiRangeSlider
                min={0}
                max={10}
                step={1}
                minValue={minValue}
                maxValue={maxValue}
                onInput={(e) => {
                  handleInputRange(e);
                }}
              />
            </div>
          </div>
        </aside>
        <button className={`search-btn ${isDisabled === false ? "search-btn-enabled" : ""}`} disabled={isDisabled} onClick={() => {
          doFilter()
        }}>Search</button>
      </div>

    </>
  )
}
MoviesTVsWidget.propTypes = {
  selectVal: PropTypes.string.isRequired,
  inptRef: PropTypes.object.isRequired,
  genres: PropTypes.array.isRequired,
  isActive: PropTypes.bool.isRequired,
  setIsActive: PropTypes.func.isRequired,
}

export default MoviesTVsWidget;