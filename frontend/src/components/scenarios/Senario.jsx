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
  const [menu, setMenu] = useState(null);
  const [coord, setCoord] = useState(null);
  const { data, loading, error } = useFetch(
    `${API_BASE_URL}/photos/${params.id}`,
  );
  const {
    data: charaData,
    loading: charaLoading,
    error: charaError,
  } = useFetch(`${API_BASE_URL}/photos/${params.id}/characters`);

  useEffect(() => {
    const handleClickAway = (e) => {
      if (
        sceneImgRef.current &&
        menuRef.current &&
        !sceneImgRef.current.contains(e.target) &&
        !menuRef.current.contains(e.target)
      ) {
        setMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickAway);
    return () => document.removeEventListener('mousedown', handleClickAway);
  }, []);

  const scenario = data.photo;

  const handleClick = (e) => {
    const bounds = e.target.getBoundingClientRect();

    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    const MENU_WIDTH = 147;
    const MENU_HEIGHT = 200;

    const openLeft = x + MENU_WIDTH > bounds.width;
    const openUp = y + MENU_HEIGHT > bounds.height;

    const coordX = (e.clientX - bounds.left) / bounds.width;
    const coordY = (e.clientY - bounds.top) / bounds.height;

    setCoord({
      x: coordX,
      y: coordY,
    });

    setMenu({
      x: x,
      y: y,
      openLeft,
      openUp,
    });
  };

  const validateCharacter = (charId, e) => {
    const chara = charaData.characters.find((char) => {
      return char.id === charId;
    });

    const dx = coord.x - chara.xPosition;
    const dy = coord.y - chara.yPosition;

    const isValid = Math.sqrt(dx * dx + dy * dy) < 0.02;
    console.log(isValid);
    if (isValid) {
      console.log(e.currentTarget.disabled);
    }
    setMenu(null);
  };

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
            {menu && (
              <div
                className={styles.dropdownMenu}
                ref={menuRef}
                style={{
                  left: menu.x + 42,
                  top: menu.y + 32,
                  transform: `
                             translate(
                                ${menu.openLeft ? '-100%' : '0'},
                                    ${menu.openUp ? '-100%' : '0'}
                                 )
                           `,
                }}
              >
                <ul>
                  {charaData.characters.map((character) => (
                    <li key={character.id}>
                      <button
                        onClick={(e) => {
                          validateCharacter(character.id, e);
                        }}
                      >
                        <img
                          src={API_BASE_URL + character.url}
                          alt={character.name}
                        />
                        <span>{character.name}</span>
                      </button>
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
