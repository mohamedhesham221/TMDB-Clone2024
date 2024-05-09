import Poster from "../../Poster/Poster";
import API from '../../../Variables/vars';
import PropTypes from "prop-types";

// Component to render posters row
// Props:-
// - posters: array for list posters 
// - sectionName: string to know which section 
// - error: bool to check if response secceded
// - isLoading: bool to check resposne still fetching
const PostersRow = ({ posters, sectionName, error, isLoading }) => {
  // Component logic ... 
  return (
    <>
      <div className={`posters-wrapper ${sectionName === 'trending' && 'is-trending'}`}>
        <div className="posters">
        {error !== null &&<div className="error">{error}</div>}
          {isLoading && <div className="loader">Is Loading, please wait . . . . . .</div>}
          {posters.map((poster, index) => {
            return <Poster imgPath={API.posterURL} poster={poster} key={index} />
          })}
        </div>
      </div>
    </>
  )
}
PostersRow.propTypes = {
  posters: PropTypes.array.isRequired,
  sectionName: PropTypes.string.isRequired,
  error: PropTypes.bool,
  isLoading: PropTypes.bool.isRequired,
}
export default PostersRow;