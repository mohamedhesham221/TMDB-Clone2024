import "./search.css";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

//Component to render form with search input for search page
//Props:
// - getInputVal: function to update search query
// - inpRef: object to get input value for updating search query
const SearchForm = ({getInputVal, inpRef}) => {
  //Component logic...
  return (
    <>
      <form onSubmit={(e) => {e.preventDefault(); getInputVal();}}>
          <fieldset>
            <button type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <input type="text" placeholder="Search..." ref={inpRef} />
          </fieldset>
        </form>
    </>
  )
}
SearchForm.propTypes = {
  getInputVal: PropTypes.func.isRequired,
  inpRef: PropTypes.object.isRequired
}
export default SearchForm;