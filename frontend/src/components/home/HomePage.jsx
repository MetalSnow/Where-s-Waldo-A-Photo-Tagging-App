import { useEffect, useState } from 'react';
import Header from '../header/Header';
import styles from './HomePage.module.css';
import { LoaderCircle } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const HomePage = () => {
  const [scenarios, SetScenarios] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/photos`);
        if (response.status >= 400) {
          throw new Error('server error!');
        }

        const resData = await response.json();
        console.log(resData.photos);
        SetScenarios(resData.photos);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };
    getData();
  }, []);
  if (error) return <p>A network error was encountered</p>;

  return (
    <>
      <Header />
      <main className={styles.container}>
        {loading ? (
          <LoaderCircle size={30} strokeWidth={2.5} className={styles.loader} />
        ) : (
          <ul>
            {scenarios.map((scenario) => {
              return <li key={scenario.id}>{scenario.name}</li>;
            })}
          </ul>
        )}
      </main>
    </>
  );
};

export default HomePage;
