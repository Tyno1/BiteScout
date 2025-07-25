import { useEffect, useState } from "react";
import axios from "axios";

type UseFetchResponse<T> = {
  loading: boolean;
  error: Error | null;
  data: T | null;
  refresh: () => void;
};

const useFetch = <T,>(url: string): UseFetchResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [shouldRefresh, setShouldRefresh] = useState<boolean>(false);

  const refresh = () => setShouldRefresh((prev) => !prev);

  useEffect(() => {
    setLoading(true);
    setData(null);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error);
        setLoading(false);
      });
  }, [url, shouldRefresh]);

  return { loading, error, data, refresh };
};

export default useFetch;
