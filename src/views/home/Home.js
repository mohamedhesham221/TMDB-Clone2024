import LatestTrailers from "../../components/Home/LatestTrailers/LatestTrailers";
import MainCover from "../../components/Home/MainCover/MainCover";
import TrendingRow from "../../components/Home/TrendingRow/TrendingRow";
import PopularTvsMovs from "../../components/Home/PopularTvsMovies/PopularTvsMovs";
import FreeToWatch from "../../components/Home/FreeTowatch/FreeToWatch";


const Home = () => {
  return(
    <>
    <main>
      <MainCover />
      <TrendingRow />
      <LatestTrailers />
      <PopularTvsMovs />
      <FreeToWatch />
    </main>
    </>
  )
}
export default Home;