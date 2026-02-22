import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import styles from './Scenarios.module.css';
import {
  ArrowLeftFromLine,
  Check,
  CircleCheck,
  CircleX,
  LoaderCircle,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Timer from '../timer/Timer';
import UserScore from '../scoreBoard/UserScore';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Scenario = () => {
  const params = useParams();
  const navigate = useNavigate();
  const sceneImgRef = useRef(null);
  const menuRef = useRef(null);
  const sceneDivRef = useRef(null);
  const statusRef = useRef(null);
  const intervalRef = useRef(null);
  const [menu, setMenu] = useState(null);
  const [coord, setCoord] = useState(null);
  const [valid, setValid] = useState({ status: null, charaNames: [] });
  const [marks, setMarks] = useState([]);
  const [count, setCount] = useState(0);
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

  const validateCharacter = (charId) => {
    if (statusRef.current) {
      statusRef.current.style.opacity = '1';
      statusRef.current.style.visibility = 'visible';
    }
    setValid((prev) => {
      return { status: false, charaNames: [...prev.charaNames] };
    });
    const imgRect = sceneImgRef.current.getBoundingClientRect();
    const containerRect = sceneDivRef.current.getBoundingClientRect();

    const chara = charaData.characters.find((char) => {
      return char.id === charId;
    });

    const dx = coord.x - chara.xPosition;
    const dy = coord.y - chara.yPosition;

    const isValid = Math.sqrt(dx * dx + dy * dy) < 0.02;

    if (isValid) {
      const offsetX = imgRect.left - containerRect.left;
      const offsetY = imgRect.top - containerRect.top;

      const pixelX = offsetX + chara.xPosition * imgRect.width;
      const pixelY = offsetY + chara.yPosition * imgRect.height;

      setMarks((prev) => {
        const alreadyExists = prev.some(
          (mark) => mark.x === pixelX && mark.y === pixelY,
        );

        if (alreadyExists) return prev;

        return [...prev, { x: pixelX, y: pixelY }];
      });

      setValid((prev) => {
        if (!prev.charaNames.includes(chara.name)) {
          return {
            status: true,
            charaNames: [...prev.charaNames, chara.name],
          };
        }
        return {
          status: true,
          charaNames: [...prev.charaNames],
        };
      });
    }
    setMenu(null);
    setTimeout(() => {
      statusRef.current.style.opacity = '0';
      statusRef.current.style.visibility = 'hidden';
    }, 1000);
  };

  const restart = () => {
    setCount(0);
    setMarks([]);
    setValid({ status: null, charaNames: [] });
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
            <button onClick={() => navigate('/')}>
              <ArrowLeftFromLine size={18} strokeWidth={3} /> Leave
            </button>
            <h1>{scenario.name} scenario</h1>
            <Timer
              intervalRef={intervalRef}
              restart={restart}
              setValid={setValid}
              count={count}
              setCount={setCount}
            />
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
                      <div>
                        <span>{character.name}</span>
                        {valid?.charaNames?.includes(character.name) && (
                          <Check
                            size={18}
                            color="#089646"
                            strokeWidth={2.75}
                            absoluteStrokeWidth
                          />
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </header>
          <div className={styles.sceneDiv} ref={sceneDivRef}>
            <UserScore
              count={count}
              marks={marks}
              intervalRef={intervalRef}
              restart={restart}
            />
            {marks.map((mark, index) => {
              return (
                <CircleCheck
                  className={styles.circleCheck}
                  key={index}
                  size={30}
                  strokeWidth={5}
                  color="#05d88a"
                  absoluteStrokeWidth
                  style={{
                    left: `${mark.x}px`,
                    top: `${mark.y}px`,
                  }}
                />
              );
            })}
            {valid?.status ? (
              <p
                className={styles.status}
                ref={statusRef}
                style={{ backgroundColor: 'green' }}
              >
                {`You found ${valid.charaNames[valid.charaNames.length - 1]}`}
                <CircleCheck />
              </p>
            ) : (
              valid?.status == false && (
                <p
                  className={styles.status}
                  ref={statusRef}
                  style={{ backgroundColor: 'red' }}
                >
                  Not quite — keep looking. <CircleX />
                </p>
              )
            )}
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
