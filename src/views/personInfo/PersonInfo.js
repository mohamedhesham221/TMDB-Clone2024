import { useEffect, useState } from "react";
import API from "../../Variables/vars";
import { useParams } from "react-router";
import Actor from "../../components/Actor/ActorProfile";
//This component displays a specific person information

const PersonInfo = () => {
  //Component logic ...

  const { id } = useParams()
  const [actorData, setActorData] = useState()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
//Function to render person information
    (async function getActorInfo() {
      try {
        const res = await fetch(`${API.baseURL}person/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=external_ids,movie_credits,tv_credits`, { signal })
        const data = await res.json();
        setActorData(data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.error("Fetch Abort");
        }
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    })()

    return () => {
      abortController.abort();
      setIsLoading(true);
    }
  }, [id])
  return (
    <>
      <Actor actor={actorData} error={error} isLoading={isLoading} />
    </>
  )
}
export default PersonInfo;