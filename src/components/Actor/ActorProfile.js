import "./actorProfile.css";
import API from "../../Variables/vars";
import ActorBiography from "./ActorBiography";
import PropTypes from "prop-types";

// Component to render actor information
// Props:-
// - actor: object to access to actor information
// - error: bool to check if response secceded
// - isLoading: bool to check resposne still fetching
const Actor = ({ actor, error, isLoading }) => {
// Component logic ...
  const genders = ["not specified", "Female", "Male", "Non-binary"]
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novmber', 'December']
  const currentDate = new Date();
  const yearInMs = 31557600000;
  const movie_credits = actor?.movie_credits?.cast.length;
  const tv_credits = actor?.tv_credits?.cast.length;
  const profileActor = require('../../assets/imgs/user-glyph.svg').default;

  const socialIcons = [
    {
      logo: require("../../assets/imgs/icons8-facebook.svg").default,
      logoTitle: "facebook Account",
      rootPath: "https://www.facebook.com/",
      logoID: actor?.external_ids?.facebook_id
    },
    {
      logo: require("../../assets/imgs/icons8-instagram.svg").default,
      logoTitle: "instagram Account",
      rootPath: "https://www.instagram.com/",
      logoID: actor?.external_ids?.instagram_id
    },
    {
      logo: require("../../assets/imgs/icons8-twitter.svg").default,
      logoTitle: "twitter Account",
      rootPath: "https://www.twitter.com/",
      logoID: actor?.external_ids?.twitter_id
    },
    {
      logo: require("../../assets/imgs/imdb_2214.svg").default,
      logoTitle: "IMDB Profile",
      rootPath: "https://www.imdb.com/title/",
      logoID: actor?.imdb_id
    }
  ]

  function getAge(birthday) {
    return Math.floor((currentDate - new Date(birthday).getTime()) / yearInMs)
  }
  return (
    <>
      <div className="actor-page">
        {error !== null && <div className="error">{error}</div>}
        {isLoading && <div className="loader">Is Loading, please wait . . .</div>}
        <div className="actor-info">
          <picture>
            <source media="(min-width: 992px)" srcSet={actor?.profile_path ?
              API.posterMedia + actor?.profile_path : profileActor} />
            <source media="(min-width: 320px)" srcSet={actor?.profile_path ?
              API.posterPersonURL + actor?.profile_path : profileActor} />
            <img src={actor?.profile_path ?
              API.posterMedia + actor?.profile_path : profileActor} alt={actor?.name} />
          </picture>
          <p className="name-mobile actor-name">{actor?.name}</p>
          <aside>
            <ul className="social-links">
              {
                socialIcons.map((icon, index) => {
                  return icon.logoID && <li key={index}>
                    <a href={icon.rootPath + icon.logoID} target="_blank" rel="noreferrer">
                      <img src={icon.logo} alt={icon.logoTitle} />
                    </a>
                  </li>
                })
              }
            </ul>
            <article>
              <p className="widget-name">Personal Info</p>
              <div className="known-for">
                <p className="header">Known For</p>
                <p>{actor?.known_for_department}</p>
              </div>
              <div className="known-credits">
                <p className="header">Known Credits</p>
                <p>{
                  movie_credits && tv_credits ?
                    movie_credits + tv_credits :
                    movie_credits && !tv_credits ?
                      movie_credits :
                      tv_credits && !movie_credits ?
                        tv_credits :
                        ""
                }</p>
              </div>
              <div className="gender">
                <p className="header">Gender</p>
                <p>{genders[actor?.gender]}</p>
              </div>
              <div className="birthday">
                <p className="header">Birthday</p>
                <p>{`
                  ${months[new Date(actor?.birthday).getMonth()]}
                  ${new Date(actor?.birthday).getDate() + 1},
                  ${new Date(actor?.birthday).getFullYear()}
                  (${getAge(actor?.birthday)} years old)
                `}</p>
              </div>
              {actor?.deathday && <div className="deathday">
                <p className="header">Deathday</p>
                <p>{
                  actor?.deathday
                }</p>
              </div>
              }
              <div className="place-birth">
                <p className="header">Place Of Birth</p>
                <p>{actor?.place_of_birth}</p>
              </div>
              <div className="known-as">
                <p className="header">Also known As</p>
                {
                  actor?.also_known_as.map((name, index) => {
                    return <p key={index}>{name}</p>
                  })
                }
              </div>
            </article>
          </aside>
        </div>
                <ActorBiography actor={actor}/>
      </div>
    </>
  )
}
Actor.propTypes = {
  actor: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
}
export default Actor;