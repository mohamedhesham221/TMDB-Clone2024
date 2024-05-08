import "./trailer.css";
import PropTypes from 'prop-types';
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import API from '../../Variables/vars';
import { useRef } from "react";

//Component to render trailer video for specific movie or TV show
//Props:
// - trailer: object for trailer details like name, key etc...
// - isPlay: bool value to play video 
// - setPlayStatue: function to change state of boolean value
const Trailer = ({ trailer, setPlayStatue, isPlay }) => {
  //Component logic
  const iframeRef = useRef("");
  const closeTrailer = () => {
    setPlayStatue(false);
    // Make node value of video null for stop video playing
    iframeRef.current.attributes[0].nodeValue = '';

  }
  return (
    <>
      <div className={`trailer ${isPlay && 'is-play'}`}>
        <section>
          <h2>{trailer?.name}</h2>
          <FontAwesomeIcon icon={faClose} color="#fff" onClick={() => closeTrailer()} />
          <iframe src={API.youtubeURL + trailer?.key} title={trailer?.name} ref={iframeRef} />
        </section>
      </div>
    </>
  )
}
Trailer.propTypes = {
  trailer: PropTypes.object.isRequired,
  setPlayStatue: PropTypes.func.isRequired,
  isPlay: PropTypes.bool.isRequired
}
export default Trailer;