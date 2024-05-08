import "./moviesTvsWidget.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import MultiRangeSlider from "multi-range-slider-react";
// Component to render widget for movies or TVs page
// Props:-
// - panelSortState: bool value to open sort list items open or close
// - setPanelSortState: function to update bool value
// - selectVal: string value to sort items depends on value
// - handleSelectChange: function to change sort items depends on value
// - panelFilterState: bool value to open or close filter panel
// - setPanelFilterState: function to change value to open or close filter panel
// - inptRef: object to detect date input value
// - getStartDate: function to update date value
// - endDate: string to add current date
// - handleInputChange: function to update end date value
// - genres: array for genres names
// - genresID: array for genres ids 
// - isActive: bool value to check if genre selected or not
// - setIsActive: function to update bool value
// - addBtnID: function to add genre id in genres array
// - isDisabled: bool value to check if serach button enable or not
// - changeIsDisable: function to update bool  value
// - minValue: number for input range min
// - maxValue: number for input range max
// - handleInputRange: function to handle input range numbers
// - filterByDate: function to trigger filter list by date 
// - filterByGenre: function to trigger filter list by genres
// - filterByScore: finction to trigger filter list by scores range
const MoviesTVsWidget = ({ panelSortState, setPanelSortState, selectVal,
  handleSelectChange, panelFilterState, setPanelFilterState,
  inptRef, getStartDate, endDate, handleInputChange,
  genres, genresID, isActive, setIsActive, addBtnID,
  isDisabled, changeIsDisable, minValue, maxValue, handleInputRange,
  filterByDate, filterByGenre, filterByScore }) => {
   // Component logic ....
  return (
    <>
      <div className="widget-filter">
        <aside>
          <div className={`sort-panel ${panelSortState ? 'open-panel' : ''}`}>
            <p>Sort
              <FontAwesomeIcon icon={faChevronRight}
                color="#000" className={`glyph-icon ${panelSortState ? 'sort-chev-rotate' : ''}`} onClick={() => setPanelSortState(!panelSortState)} />
            </p>
            <hr />
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
            <hr />
            <p>Release Dates</p>
            <form className="date-range">
              <fieldset>
                <div className="from">
                  <label>from</label>
                  <input type="date" ref={inptRef} onChange={getStartDate} />
                </div>
                <div className="to">
                  <label>to</label>
                  <input type="date" value={endDate} onChange={handleInputChange} />
                </div>
              </fieldset>
              <hr />
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
              <hr />
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
          filterByDate();
          filterByGenre();
          filterByScore();
        }}>Search</button>
      </div>

    </>
  )
}
MoviesTVsWidget.propTypes = {
  panelSortState: PropTypes.bool.isRequired,
  setPanelSortState: PropTypes.func.isRequired,
  selectVal: PropTypes.string.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  panelFilterState: PropTypes.bool.isRequired,
  setPanelFilterState: PropTypes.func.isRequired,
  inptRef: PropTypes.object.isRequired,
  getStartDate: PropTypes.func.isRequired,
  endDate: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  genres: PropTypes.array.isRequired,
  genresID: PropTypes.array.isRequired,
  isActive: PropTypes.bool.isRequired,
  setIsActive: PropTypes.func.isRequired,
  addBtnID: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  changeIsDisable: PropTypes.func.isRequired,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  handleInputRange: PropTypes.func.isRequired,
  filterByDate: PropTypes.func.isRequired,
  filterByGenre: PropTypes.func.isRequired,
  filterByScore: PropTypes.func.isRequired
}

export default MoviesTVsWidget;