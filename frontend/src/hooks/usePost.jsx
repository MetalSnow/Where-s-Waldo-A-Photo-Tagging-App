import { useState } from 'react';

const usePost = (url) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const action = async (postData) => {
    'use server';
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      return result;
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { action, error, isLoading };
};

export default usePost;
