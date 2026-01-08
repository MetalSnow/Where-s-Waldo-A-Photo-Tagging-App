import { useCallback, useEffect, useState } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const getData = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch(url);
      if (response.status >= 400) {
        throw new Error('server error!');
      }

      const resData = await response.json();
      setData(resData.photos);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }, [url]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, loading, error };
};

export default useFetch;
