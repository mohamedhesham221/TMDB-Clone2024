import "./people.css";
import PropTypes from "prop-types";
import API from "../../Variables/vars";
import { useNavigate } from "react-router";

// Component to render actors list 
// Props:-
// - popularPeople: array of actors data
// - error: bool for if response succeed ot not
// - isLoading: bool for render loading message until data responed
const PopularPeople = ({popularPeople, error, isLoading}) => {
  //Component logic ....
  const profileActor = require('../../assets/imgs/user-glyph.svg').default;
  const navigate = useNavigate();
  const getPersonDetails = (actor) => {
    navigate(`${actor.id}/${actor.name.replaceAll(" ","-")}`, 
    {state: {
      id: actor.id
    }})
  }
  return (
    <>
    <div className="page-body">
        <h2 className="page-title">Popular People</h2>
        <div className="popular-people-list">
        {error !== null &&<div className="error">{error}</div>}
          {isLoading && <div className="loader">Is Loading, please wait . . .</div>}
          {
            popularPeople.map((card) => {
              return <div className="person-popular-card" key={card.id} 
                          onClick={() => getPersonDetails(card)}>
                <div className="person-popular-image" 
                style={
                  {background: `no-repeat center -20px /cover url(${card.profile_path === null? profileActor: API.posterPersonURL+card.profile_path})`}
                  }></div>
                <div className="person-popular-info">
                  <p className="person-popular-name">{card.name}</p>
                  <p className="person-popular-movies">
                    {
                      card.known_for.map((p,i) => p.media_type === 'movie' ?
                      card.known_for.length === (i + 1) ? "and "+p.title : p.title + ", " :
                      card.known_for.length === (i + 1) ? "and "+p.name : p.name + ", ")
                    }
                  </p>
                </div>
              </div>
            })
          }
        </div>
          </div>
    </>
  )
}
PopularPeople.propTypes = {
  popularPeople: PropTypes.array.isRequired,
  error: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
}
export default PopularPeople;