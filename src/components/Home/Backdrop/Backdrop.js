import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import API from '../../../Variables/vars';
import PropTypes from "prop-types";
import { useEffect, useState } from 'react';
// Component to render backdrop background for latest trailers section
// Props:-
// item: object for movie or Tv info
// bgRef: object to acces to style background image
// setTrailer: function to set video triler
// setPlayStatue: function to update if video run or not
const Backdrop = ({ item, bgRef, setTrailer, setPlayStatue }) => {
  // Component logic ...
  const [backdropVideo, setBackdropVideo] = useState();
  useEffect(() => {
    const getVideo = async () => {
      try {
        const res = await fetch(`${API.baseURL}${item.release_date ? 'movie' : 'tv'}/${item.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`);
        const data = await res.json()
        setBackdropVideo(data.results);
      } catch (error) {
        console.log(error)
      }
    }
    getVideo();
  }, [item])
  // function to send video to trailer component and play it
  const sendToTrailerComp = (vid) => {
    const filterd = vid.filter((t) => t.type === 'Trailer');
    setTrailer(filterd[0])
    setPlayStatue(true)
  }
  const changeMainBG = () => {
    return bgRef.current.style.backgroundImage = `url(${API.backdropURL + item.backdrop_path})`;
  }
  return (
    <>
      <div className="backdrop">
        <div className="backdrop-img" onMouseEnter={() => changeMainBG()}
          style={{ background: `no-repeat center/cover url( ${API.backdropURL + item.backdrop_path})`}}>
          <FontAwesomeIcon icon={faPlay} style={{ color: '#fff' }}
            onClick={() => { sendToTrailerComp(backdropVideo); }} />
        </div>
        <p className='backdrop-title'>{item.release_date ? item.title : item.name} <br />
          <span className='backdrop-video-name'>
            {
              backdropVideo?.length !== 0 &&
              backdropVideo?.filter((t) => t.type === 'Trailer' && t.name).map((n, i) => i === 0 && n.name)
            }
          </span>
        </p>
      </div>
    </>
  )
}
Backdrop.propTypes = {
  item: PropTypes.object.isRequired,
  bgRef: PropTypes.object.isRequired, 
  setTrailer: PropTypes.func.isRequired,
  setPlayStatue: PropTypes.func.isRequired
}
export default Backdrop;