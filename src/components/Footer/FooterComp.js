import "./footerComp.css"
// Component to render footer for every page
const FooterComp = () => {
  // Component logic ....
  const footerLogo = require('../../assets/imgs/footer-logo.svg').default;
  return (
    <>
    <div className='footer'>
    <footer>
      <div className='footer-parts'>
        <img className='footer-logo' src={footerLogo} alt="tmdb logo"/>
        <p>join the community</p>
      </div>
      <div className='footer-parts'>
        <ul>
          <li>THE BASICS</li>
          <li>About TMDB</li>
          <li>Contact Us</li>
          <li>Support Forums</li>
          <li>API</li>
          <li>System Status</li>
        </ul>
      </div>
      <div className='footer-parts'>
      <ul>
          <li>GET INVOLVED</li>
          <li>Contribution Bible</li>
          <li>Add New Movie</li>
          <li>Add New TV Show</li>
        </ul>
      </div>
      <div className='footer-parts'>
      <ul>
          <li>COMMUNITY</li>
          <li>Guidelines</li>
          <li>Discussions</li>
          <li>Leaderboard</li>
          <li>Twitter</li>
        </ul>
      </div>
      <div className='footer-parts'>
      <ul>
          <li>LEGAL</li>
          <li>Terms of Use</li>
          <li>API Terms of Use</li>
          <li>Privacy Policy</li>
          <li>DMCA Takedown Request</li>
        </ul>
      </div>
    </footer>
    </div>
    </>
  )
}
export default FooterComp;