import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url, method = "get") {
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    let unmounted = false;
    (async function () {
      try {
        setLoading(true);
        setIsFetched(true);
        let res = await axios({
          method,
          url,
        });

        if (unmounted) return;

        console.log(data);

        setData(res.data);
        setLoading(false);
      } catch (error) {
        if (unmounted) return;
        setIsError(true);
        setErrors((pe) => [...pe, error]);
      }
    })();

    return () => {
      unmounted = true;
    };
  }, [url, method]);

  return { loading, isError, errors, data, isFetched };
}

export default useFetch;
