import { useContext } from "react";
import { Context } from "../../context/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
// Component to render social links , keywords, revenue, budget, languages 

const PosterInfoWidget = () => {
  //Component logic ...

  const { parent, poster} = useContext(Context);
  const social = poster?.external_ids;
  const keywords = poster?.keywords?.keywords;
  const revenue = new Intl.NumberFormat('en-US', { style: 'currency', currency: "USD" }).format(poster?.revenue);
  const budget = new Intl.NumberFormat('en-US', { style: 'currency', currency: "USD" }).format(poster?.budget);
  const originalLangs = {
    "en": "English",
    "de": "Germany",
    "jp": "Japanese",
    "fr": "French",
    "bs": "Bosnian",
    "sr": "Serpian"
  }
  const socialIcons = [
    {
      logo: require("../../assets/imgs/icons8-facebook.svg").default,
      logoTitle: "facebook",
      rootPath: "https://www.facebook.com/",
      logoID: social?.facebook_id
    },
    {
      logo: require("../../assets/imgs/icons8-instagram.svg").default,
      logoTitle: "instagram",
      rootPath: "https://www.instagram.com/",
      logoID: social?.instagram_id
    },
    {
      logo: require("../../assets/imgs/icons8-twitter.svg").default,
      logoTitle: "twitter",
      rootPath: "https://www.twitter.com/",
      logoID: social?.twitter_id
    },
    {
      logo: require("../../assets/imgs/imdb_2214.svg").default,
      logoTitle: "IMDB",
      rootPath: "https://www.imdb.com/title/",
      logoID: social?.imdb_id
    }
  ]
  console.log(poster)
  return (
    <>
      <div className='poster-widget'>
        <aside>
          <ul className="social-links">
            {
              socialIcons?.map((icon, index) => {
                return icon.logoID && <li key={index}>
                  <a href={icon.rootPath + icon.logoID} target="_blank" rel="noreferrer">
                    <img src={icon.logo} alt={icon.logoTitle} />
                  </a>
                </li>
              })
            }
            {
              poster?.homepage && <li><a href={poster?.homepage} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faLink} color="#000" style={{borderLeft: "2px solid #d7d7d7", height:"25px", paddingLeft: "15px"}}/>
                </a></li>
            }
          </ul>
          <div className='poster-status'>
            <p>Status</p>
            <p>{poster?.status}</p>
          </div>
          <div className='poster-language'>
            <p>Original Language</p>
            {parent === "movie" ?
              <p>{originalLangs[poster?.original_language]}</p> :
              <p>{poster?.languages?.length && poster?.languages.map((lang, index) => poster?.languages.length - 1 === index ? originalLangs[lang] : originalLangs[lang] + ", ")}</p>
            }
          </div>
          {parent === "tv" ?
          <div className="poster-network">
            <p>Networks</p>
            {poster?.networks?.length && poster?.networks.map((network, index) => 
            <img src={"https://media.themoviedb.org/t/p/h30/"+network.logo_path} alt={network.name} key={index}/>)}
          </div>
          :
          <div className='poster-budget'>
            <p>{parent === "movie" ? "Budget" : ""}</p>
            <p>{parent === "movie" ? (poster?.budget === 0 ? "-" : budget) : ""}</p>
          </div>
          }
          {parent === "tv" ?
            <div className="poster-type">
              <p>Type</p>
              <p>{poster?.type}</p>
            </div>
              :
          <div className='poster-revenue'>
            <p>{parent === "movie" ? "Revenue" : ""}</p>
            <p>{parent === "movie" ? (poster?.revenue === 0 ? "-" : revenue) : ""}</p>
          </div>
          }
          <div className='poster-keywords'>
            <p>Keywords</p>
            {
              keywords?.length ?
                <ul className="keywords-list">
                  {
                    keywords?.map((keyword, index) => {
                      return <li key={index}>{keyword.name}</li>
                    })
                  }
                </ul>
                :
                <p>No keywords have been added.</p>
            }
          </div>
        </aside>
      </div>

    </>
  )
}
export default PosterInfoWidget;