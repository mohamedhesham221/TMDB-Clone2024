import { Route, Routes } from 'react-router';
import './css/App.css';
import './css/mediascreen.css';
import Navbar from './components/Navbar/Navbar';
import Home from './views/home/Home';
import ContainerMoviesTvs from './views/moviesTVs/ContainerMoviesTvs';
import People from './views/people/PopularPeople';
import Search from './views/search/Search';
import PosterInfo from './views/posterInfo/PosterInfo';
import PersonInfo from './views/personInfo/PersonInfo';


function App() {
  return (
    <div className="App">
      <Navbar /> 
      <Routes>
        {/*Route for the Homepage */}
        <Route path='*' element={<Home />} />
        {/*Route for movies and tv shows list with dynamic paths*/}
        <Route exact path='/:parentPath/:childPath' element={<ContainerMoviesTvs />} />
        {/*Route for poster information from movies or tv shows category page with dynamic paths*/}
        <Route path='/:parentPath/:childPath/:parent/:id/:name' element={<PosterInfo />}/>
        {/*Route for search page*/} 
        <Route exact path='/search' element={<Search />} />
        {/*Route for poster information from search page with dynamic paths*/}
        <Route path='/search/:parent/:id/:name' element={<PosterInfo />}/>
        {/*Route for poster information from Homepage with dynamic paths*/}
        <Route path='/:parent/:id/:name' element={<PosterInfo />}/>
        {/*Route for the people page */}
        <Route path='/people' element={<People />} />
        {/*Route for the person information */}
        <Route path='/people/:id/:actor' element={<PersonInfo />} />
      </Routes>
    </div>
  );
}

export default App;
