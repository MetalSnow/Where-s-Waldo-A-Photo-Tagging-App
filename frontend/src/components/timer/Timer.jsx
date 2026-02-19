import { useState, useEffect } from 'react';
import styles from './Times.module.css';

export default function Timer({ restart, setValid }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [count]);

  const handleClick = () => {
    setCount(0);
    restart([]);
    setValid({ status: null, charaNames: [] });
  };

  return (
    <div className={styles.timer}>
      <p>
        Duration: <span>{count}</span>
      </p>
      <button onClick={handleClick}>Reset</button>
    </div>
  );
}
