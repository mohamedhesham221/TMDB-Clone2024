import "./navbar.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

// Component to create navbar links to link web page as single page application

const Navbar = () => {
  // Component logic ....
  const largeScreenLogo = require("../../assets/imgs/nav-logo.svg").default;
  const smallScreenLogo = require("../../assets/imgs/footer-logo.svg").default;
  const [showNav, setShowNav] = useState(false);
  const items = document.querySelectorAll(".navbar-sublist");

  const subListAccordion = (num) => {
    if (window.matchMedia('(max-width: 768px)').matches) {
      items.forEach((x, i) => {
        if (num === i) {
          x.classList.toggle("showSubList-mobile");
        }
      })
    }
  }
    window.onscroll = () => {
      let nav = document.querySelector('.navbar');
      if (window.scrollY >= 500) {
        nav.classList.add('fixedNav')
      } else {
        nav.classList.remove('fixedNav')
      }
    }
    
  return (
    <>
      <nav className="navbar">
        <FontAwesomeIcon icon={faBars} color="#fff" onClick={() => setShowNav(!showNav)} className="hamburger-icon" />
        <Link to='/' className="home-logo-link">
          <picture>
            <source media="(min-width: 992px)" srcSet={largeScreenLogo} />
            <source media="(min-width: 375px)" srcSet={smallScreenLogo} />
            <img src={smallScreenLogo} alt="tmdb logo" />
          </picture>
        </Link>
        <ul className={`navbar-list ${showNav && "showNav"}`}>
          <li>
            <span onClick={() => subListAccordion(0)}>Movies</span>
            <ul className="navbar-sublist">
              <li><Link to='movies/popular'>Popular</Link></li>
              <li><Link to='movies/top_rated'>Top Rated</Link></li>
              <li><Link to='movies/upcoming'>Upcoming</Link></li>
              <li><Link to='movies/now_playing'>Now Playing</Link></li>
            </ul>
          </li>
          <li>
            <span onClick={() => subListAccordion(1)}>TV Show</span>
            <ul className="navbar-sublist">
              <li><Link to='tv_shows/popular'>Popular</Link></li>
              <li><Link to='tv_shows/top_rated'>Top Rated</Link></li>
              <li><Link to='tv_shows/on_the_air'>On TV</Link></li>
              <li><Link to='tv_shows/airing_today'>Airing Today</Link></li>
            </ul>
          </li>
          <li>
            <span onClick={() => subListAccordion(2)}>People</span>
            <ul className="navbar-sublist">
              <li><Link to='people'>Popular People</Link></li>
            </ul>
          </li>
        </ul>
      </nav >
    </>
  )
}
export default Navbar;