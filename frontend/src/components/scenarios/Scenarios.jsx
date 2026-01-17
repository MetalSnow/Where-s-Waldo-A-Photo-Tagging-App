import { LoaderCircle } from 'lucide-react';
import useFetch from '../../hooks/useFetch';
import styles from './Scenarios.module.css';
import { Link } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Scenarios = () => {
  const { data, loading, error } = useFetch(`${API_BASE_URL}/photos`);

  return (
    <div className={styles.container}>
      {error ? (
        <p>A network error was encountered</p>
      ) : loading ? (
        <LoaderCircle size={30} strokeWidth={2.5} className={styles.loader} />
      ) : (
        <ul>
          {data.photos.map((scenario) => {
            return (
              <li key={scenario.id}>
                <Link to={`/scenarios/${scenario.id}`}>
                  <img
                    src={API_BASE_URL + scenario.fileUrl}
                    alt={scenario.name}
                  />
                  <span>{scenario.name} scenario</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Scenarios;
