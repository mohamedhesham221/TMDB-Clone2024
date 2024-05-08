import "./switcherBtn.css"
import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Component to render switcher navigateion for changing between states of rows sections date (stream, Movies, TVs) 
// Props:-
// states: array for rendring specific section states for each component
// currentState: string to detect which switcher state will go
// newState: function to update state 
// sectionName: string to check if section is trailer or not to change style 
const SwitcherBtn = ({ states, currentState, newState, sectionName }) => {
  //Component logic ...
  const [positioning, getPosition] = useState();
  const [currentWidth, getWidth] = useState();
  const [showList, setListState] = useState(false);

  const elementRef = useRef(null);

  useEffect(() => {
    // Function to update element width depend on items within it
    getWidth(elementRef.current.offsetWidth)
  }, [currentState])
  return (
    <>
      <div className="switcher-btn_mobile">
        <div className={`current-state ${showList && 'hide'} ${sectionName === 'trailers' && 'trailer_exception-mobile'}`} onClick={() => setListState(true)}>
          <p>
            {
              states.map((state) => {
                return currentState === state.state && state.text
              })
            }
            <FontAwesomeIcon icon={faChevronDown} color={sectionName === 'trailers' ? "#032541" : "#c0fecf"} style={{ fontSize: '12px', marginLeft: '5px' }} />
          </p>
        </div>
        <ul className={`switcher-list ${showList && 'show'}`}>
          {
            states.map((state, index) => {
              return <li key={index} className={`${currentState === state.state && 'active-mobile'}`} onClick={() => { newState(state.state); setListState(false); }}>
                    <span>
                      {state.text}
                      <FontAwesomeIcon icon={faChevronDown} color={`${currentState === state.state ? '#c0fecf' : 'transparent'}`} style={{ fontSize: '12px', marginLeft: '5px' }} />
                    </span>
            
              </li>
            })
          }
        </ul>
      </div>
      <div className="switcher-btn_desktop">
        <div className="switcher-items" >
          <div className="slider" style={sectionName === 'trailers' ?
            {
              transform: `translateX(${positioning}px)`,
              backgroundImage: 'linear-gradient(to right, #c0fecf 0%, #1ed5a9 100%)',
              width: `${currentWidth}px`
            }
            :
            {
              transform: `translateX(${positioning}px)`,
              width: `${currentWidth}px`
            }
          }></div>
          <div className={`items ${sectionName === 'trailers' && 'trailer_exception-desktop'}`}>
            {
              states.map((state, index) => {
                return index === 0 ?
                  <p className={`${currentState === state.state && 'active-desktop'}`}
                    onClick={(e) => {
                      newState(state.state);
                      getPosition(e.currentTarget.offsetLeft);
                      getWidth(e.currentTarget.offsetWidth);
                    }}
                    key={index} ref={elementRef}>
                    <span>{state.text}</span>
                  </p>
                  :
                  <p className={`${currentState === state.state && 'active-desktop'}`}
                    onClick={(e) => {
                      newState(state.state);
                      getPosition(e.currentTarget.offsetLeft);
                      getWidth(e.currentTarget.offsetWidth);
                    }}
                    key={index}>
                    <span>{state.text}</span>
                  </p>
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}
SwitcherBtn.propTypes = {
  states: PropTypes.array.isRequired,
  currentState: PropTypes.string.isRequired,
  newState: PropTypes.func.isRequired,
  sectionName: PropTypes.string.isRequired
}
export default SwitcherBtn;