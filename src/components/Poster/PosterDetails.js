import { Context } from "../../context/context";
import "./posterInfo.css"
import PropTypes from 'prop-types';
import PosterInfoHead from "./PosterInfoHead";
import PosterInfoBody from "./PosterInfoBody";
import PosterInfoWidget from "./PosterInfoWidget";

//Compoent for dividing all poster content to three components
// Props:-
// parent: string for root path in URL
// poster: object for all poster details
// fullYear: string for release year 
// currentColor: string for rate color
// currentBaseColor: string for rate color
// rate: number of averge rate 
// sendToTrailerComp: function to send video to trailer component
// sectionRef: object to get section height

const PosterDetails = ({ parent, poster, fullYear,
  currentColor, currentBaseColor, rate, sendToTrailerComp, sectionRef }) => {
    //Compoent logic ...
  return (
    <>
      <Context.Provider value={{
        parent, poster, fullYear,
        currentColor, currentBaseColor, rate, sendToTrailerComp, sectionRef
      }}>
        <PosterInfoHead />
        <PosterInfoBody />
        <PosterInfoWidget />
      </Context.Provider>
    </>
  )
}
PosterDetails.propTypes = {
  parent: PropTypes.string.isRequired,
  poster: PropTypes.object.isRequired,
  fullYear: PropTypes.number.isRequired,
  currentColor: PropTypes.string.isRequired,
  currentBaseColor: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  sendToTrailerComp: PropTypes.func.isRequired,
  sectionRef: PropTypes.object.isRequired

}
export default PosterDetails;