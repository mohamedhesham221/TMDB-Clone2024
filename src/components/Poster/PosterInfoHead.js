import { useContext, useState } from 'react';
import { Context } from '../../context/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faPlay } from "@fortawesome/free-solid-svg-icons";
import API from '../../Variables/vars';
// Component to render poster image , background, name, rate , trailer, crew, content and genres
const PosterInfoHead = () => {
  //Component logic ...
  const { parent, poster, fullYear, rate, currentColor, currentBaseColor,
    sendToTrailerComp, sectionRef } = useContext(Context);
  const crew = poster.credits?.crew?.filter(el => el.department === "Directing" || el.department === "Writing");
  const plexLogo = require("../../assets/imgs/plexlogo.svg").default
  const youtubeLogo = require("../../assets/imgs/YouTube-Icon-White-Logo.wine.svg").default
  const [showPlatforms, setSHowPlatform] = useState(false)
  
 return (
    <>
      <div className='poster-head' style={{ background: `no-repeat 50px center/cover url(${API.backdropURL + poster?.backdrop_path})` }}>
        <div className='poster-layer'></div>
        <div className='poster-content'>
          <img src={API.posterMedia + poster?.poster_path}
            alt={parent === 'movie' ? poster?.title : poster?.name} loading='lazy' />
          <section ref={sectionRef}>
            <h2 className='poster-title'>
              <span>
                {parent === 'movie' ?
                  poster?.title : poster?.name}
              </span>&nbsp;
              <span>{`(${fullYear})`}</span>
            </h2>
            <article>
              <div className='user-score_trailer'>
                <p className="progress-bar" style={{
                  background: `radial-gradient(closest-side, #081C22 ${window.outerWidth >= 992 ? 25 + "px" : "15px"}, transparent
                              ${window.outerWidth >= 992 ? 27 + "px" : "17px"} 100%),
                              conic-gradient(${currentColor} ${rate}%, ${currentBaseColor} 0)`
                }}>
                  <progress value={rate} min={0} max={100} style={{ visibility: 'hidden', width: '0', height: '0' }}></progress>
                  <span className="rate">{rate === 0 ? "NR" : rate}<sup>{rate !== 0 && "%"}</sup></span>
                </p>
                User Score
                <span className='divider'></span>
                <div className='watch-trailer'>
                  <p onClick={() => setSHowPlatform(!showPlatforms)}><FontAwesomeIcon icon={faPlay} />Play Trailer</p>
                  <ul className={showPlatforms ? "fade-in-platforms" : ""}>
                    <li>
                      <button onClick={() => sendToTrailerComp()}>
                        <img src={youtubeLogo} alt='youtube logo' />
                      </button>
                    </li>
                    <li>
                      <button>
                        <a href={API.plexURL+encodeURIComponent(parent === "tv" ?poster?.name : poster?.title)} target='_blank' rel="noopener noreferrer">
                          <img src={plexLogo} alt='pexel logo' />
                        </a>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='poster-release-genres'>

                <p className='poster-release'>
                  {parent === 'movie' &&
                    (new Date(poster?.release_date).getMonth() + 1) + "/" +
                    (new Date(poster?.release_date).getDate() + 1) + "/" +
                    new Date(poster?.release_date).getFullYear()}
                  &nbsp;
                  {`(${poster?.production_countries?.length === 1 ?
                    poster?.production_countries?.map(iso => iso.iso_3166_1)
                    : poster?.production_countries?.filter(iso => iso.iso_3166_1 === "US").map(iso => iso.iso_3166_1)})`}
                  &nbsp;
                  <FontAwesomeIcon icon={faCircle} style={parent !== 'movie' && { display: "none" }} />
                  &nbsp;
                </p>
                <p className='poster-runtime'>
                  {`${parent === 'movie' ? Math.trunc(poster?.runtime / 60) + "h" : ""}
          ${parent === 'movie' ? (poster?.runtime % 60) + "m" : ""}`}
                </p>
                <p className='poster-genres'>
                  {poster?.genres?.map((genre, i) => poster?.genres.length === (i + 1) ? genre.name : genre.name + ", ")}
                  <FontAwesomeIcon icon={faCircle} style={parent !== 'movie' && { display: "none" }} />
                </p>
              </div>
              <div className='poster-tagline_overview'>
                <p className='poster-tagline'><i>{poster?.tagline}</i></p>
                <p className='poster-overview-head'>Overview</p>
                <p className='poster-overview-content'>{poster?.overview}</p>
              </div>
              {parent === "tv" ?
                <div className='poster-credits'>
                  {
                    crew?.filter(person => person.known_for_department === "Writing" || person.known_for_department === "Production")
                      .map((person, index) => <p className='poster-director' key={index}>
                        <span className='name'>{person.name}</span><br />
                        <span className='job'>{person.job}</span></p>)
                  }
                </div>
                :
                <div className='poster-credits'>
                  {crew?.filter(person => person.job === "Director")
                    .map((person, index) => <p className='poster-director' key={index}>
                      <span className='name'>{person.name}</span><br />
                      <span className='job'>{person.job}</span></p>)}
                  {crew?.filter(person => person.known_for_department === "Writing" && (person.job === "Writer" || person.job === "Screenplay"))
                    .map((person, index) => <p className='poster-director' key={index}>
                      <span className='name'>{person.name}</span><br />
                      <span className='job'>{person.job}</span></p>)}
                </div>
              }
            </article>
          </section>
        </div>
      </div>

    </>
  )
}
export default PosterInfoHead;