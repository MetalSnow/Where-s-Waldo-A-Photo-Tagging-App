import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import styles from './Scenarios.module.css';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Scenario = () => {
  const params = useParams();
  const sceneImgRef = useRef(null);
  const menuRef = useRef(null);
  const [position, setPosition] = useState(null);
  const { data, loading, error } = useFetch(
    `${API_BASE_URL}/photos/${params.id}`,
  );
  const {
    data: charaData,
    loading: charaLoading,
    error: charaError,
  } = useFetch(`${API_BASE_URL}/photos/${params.id}/characters`);

  const scenario = data.photo;

  const handleClick = (e) => {
    const bounds = e.target.getBoundingClientRect();

    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    setPosition({ x, y });
  };

  useEffect(() => {
    const handleClickAway = (e) => {
      if (
        sceneImgRef.current &&
        menuRef.current &&
        !sceneImgRef.current.contains(e.target) &&
        !menuRef.current.contains(e.target)
      ) {
        setPosition(null);
      }
    };

    document.addEventListener('mousedown', handleClickAway);
    return () => document.removeEventListener('mousedown', handleClickAway);
  }, []);

  return (
    <>
      {error ? (
        <p>A network error was encountered</p>
      ) : loading ? (
        <LoaderCircle size={30} strokeWidth={2.5} className={styles.loader} />
      ) : (
        <>
          <header className={styles.sceneHeader}>
            <h1>{scenario.name} scenario</h1>
            <p>
              Duration: <span>0</span>
            </p>
            <div>
              {charaError ? (
                <p>A network error was encountered</p>
              ) : charaLoading ? (
                <LoaderCircle
                  size={30}
                  strokeWidth={2.5}
                  className={styles.loader}
                />
              ) : (
                <ul>
                  {charaData.characters.map((character) => (
                    <li key={character.id}>
                      <img
                        src={API_BASE_URL + character.url}
                        alt={character.name}
                      />
                      <span>{character.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </header>
          <div className={styles.sceneDiv}>
            <img
              ref={sceneImgRef}
              onClick={handleClick}
              src={API_BASE_URL + scenario.fileUrl}
              alt={scenario.name}
              className={styles.sceneImg}
            />
            {position && (
              <div
                className={styles.dropdownMenu}
                ref={menuRef}
                style={{
                  left: position.x + 42,
                  top: position.y + 32,
                }}
              >
                <ul>
                  {charaData.characters.map((character) => (
                    <li key={character.id}>
                      <a href="#">
                        <img
                          src={API_BASE_URL + character.url}
                          alt={character.name}
                        />
                        <span>{character.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Scenario;
