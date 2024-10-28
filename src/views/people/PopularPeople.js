import { useState, useEffect } from "react";
import API from "../../Variables/vars";
// import FooterComp from "../../components/Footer/FooterComp";
import Pagination from "../../components/Pagination/Pagination";
import PopularPeople from "../../components/People/PopularPeople";
//Component to render people page
const People = () => {
  //Component logic
  const [pageNum, setPageNum] = useState(1)
  const [popularPeople, setPopularPeople] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    //Function to get popular people date
    (async function getPopularPeople() {
      try {
        const response = await fetch(`${API.baseURL}person/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${pageNum}`,{signal})
        const peopleData = await response.json();
        setPopularPeople(peopleData.results);
      } catch (error) {
        if (error.name === "AbortError") {
          console.error("Fetch Aborted")
        }
        setError(error.message)
      } finally {
        setIsLoading(false);
      }
    })()

    return () => {
      abortController.abort();
      setIsLoading(true)
    }
  }, [pageNum])
  return (
    <>
      <main>
        <PopularPeople popularPeople={popularPeople} error={error} isLoading={isLoading} />
      </main>
      <Pagination pageNum={pageNum} setPageNum={setPageNum} />

    </>
  )
}
export default People;