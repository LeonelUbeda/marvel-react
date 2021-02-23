import { useState, useEffect } from 'react';
import useFetch from './useFetch';

const useMarvelFetch = (url, options = {}) => {
  const { error, response, isLoading } = useFetch(url, options);
  const [elements, setElements] = useState(null);
  const [total, setTotal] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const [pagesQuantity, setPagesQuantity] = useState(null);
  const [actualPage, setActualPage] = useState(null);

  useEffect(() => {
    if (!isLoading && !error && response.code) {
      setStatusCode(response.code);
    }

    if (response && !error && !isLoading && response.code === 200) {
      const { limit, responseTotal } = response.data;
      setStatusCode(response.code);
      setElements(response.data.results);
      setTotal(responseTotal);
      setPagesQuantity(Math.round(responseTotal / limit));
      setActualPage(Math.round(responseTotal / limit));
    }
  }, [error, response, isLoading]);

  return {
    error,
    elements,
    total,
    isLoading,
    statusCode,
    pagesQuantity,
    actualPage,
    response,
  };
};

export default useMarvelFetch;
