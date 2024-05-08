import "./poster.css"
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Component to render a movie or TV show poster with some details about it like name, rate, release date
// Props: 
// - imgPath: string for source of image  
// - poster: object item for poster details of movie or TV show
const Poster = ({ imgPath, poster}) => {
  // Component logic....
  const navigate = useNavigate();
  const rate = Math.round(poster.vote_average * 10);
  const [currentColor, setCurrentColor] = useState();
  const [currentBaseColor, setCurrentBaseColor] = useState();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const releaseDate = new Date(poster.release_date);
  const firstAirDate = new Date(poster.first_air_date);

  //Function to send data for movie or TV show to its own page and replace space to - in URL 
  const getDetails = () => {
    navigate(
      `${poster.first_air_date ?
        'tv' : 'movie'}/${poster.id}/${poster.first_air_date ?
        poster.name.replaceAll(" ","-"): poster.title.replaceAll(" ","-")}`, {
      state: {
        id: poster.id
      }
    })
  }
  useEffect(() => {
    const colors = {
      hightRate: '#21d07a',
      hightRateBase: '#003d20ce',
      midRate: '#d2d531',
      midRateBase: '#3a3b00e0',
      lowRate: '#db2360',
      lowRateBase: '#460017cb'
    }
    if (rate >= 0 && rate <= 50) {
      setCurrentColor(colors.lowRate)
      setCurrentBaseColor(colors.lowRateBase)
    } else if (rate > 50 && rate <= 70) {
      setCurrentColor(colors.midRate)
      setCurrentBaseColor(colors.midRateBase)
    } else if (rate > 70) {
      setCurrentColor(colors.hightRate)
      setCurrentBaseColor(colors.hightRateBase)
    }
  }, [rate])

  return (
    <>
      <div className="poster">
        <div className="poster_img_rate" onClick={() => getDetails()}>
          <img src={imgPath + poster.poster_path} alt={poster.title} loading="lazy" />
          <div className="progress-bar" style={{
            background: `radial-gradient(closest-side, #081C22 ${window.outerWidth>=1200? "15px": "12px"},
              transparent ${window.outerWidth>=1200? "16px": "13px"} 100%),
    conic-gradient(${currentColor} ${rate}%, ${currentBaseColor} 0)`
          }}>
            <progress value={rate} min={0} max={100} style={{ visibility: 'hidden', width: '0', height: '0' }}></progress>
            <p className="rate">{rate === 0 ? "NR" : rate}<sup>{rate !== 0 && "%"}</sup></p>
          </div>
        </div>
        <div className="poster_name_date">
          <p className="poster-title">
            {poster.media_type === 'tv' || poster.first_air_date ? poster.name : poster.title}</p>
          <p className="poster-date">
            {poster.media_type === 'tv' || poster.first_air_date ?
              poster.first_air_date.length ?
                `
              ${months[firstAirDate.getMonth()]}
              ${firstAirDate.getDate() < 10 ? '0' + firstAirDate.getDate() : firstAirDate.getDate()},
              ${firstAirDate.getFullYear()}
              `
                :
                "N/A"
              :
              poster.release_date?.length ?
                `
              ${months[releaseDate.getMonth()]}
              ${releaseDate.getDate() < 10 ? '0' + releaseDate.getDate() : releaseDate.getDate()},
              ${releaseDate.getFullYear()}
              `
                :
                "N/A"
                
            }
          </p>
        </div>
      </div>
    </>
  )
}
Poster.propTypes = {
  imgPath: PropTypes.string.isRequired,
  poster: PropTypes.object.isRequired
}
export default Poster;