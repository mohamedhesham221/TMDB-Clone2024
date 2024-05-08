import "./pagination.css";
import PropTypes from "prop-types";
// Component to render pagination for page
// Props:-
// - pageNum: number to dynamicly render list of data in one page
// - setPageNum: function to update number of pages in API
const Pagination = ({pageNum, setPageNum}) => {
  //Component logic ...
  return (
    <>
        <div className="pagination">
              <button className={pageNum === 1 ? "active" : ''} onClick={() => setPageNum(1)}>1</button>
              <button className={pageNum === 2 ? "active" : ''} onClick={() => setPageNum(2)}>2</button>
              <button className={pageNum === 3 ? "active" : ''} onClick={() => setPageNum(3)}>3</button>
            </div>
    </>
  )
}
Pagination.propTypes= {
  pageNum: PropTypes.number.isRequired,
  setPageNum: PropTypes.number.isRequired
}
export default Pagination;