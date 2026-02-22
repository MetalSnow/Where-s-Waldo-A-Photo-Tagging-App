import { useEffect } from 'react';
import styles from './Times.module.css';

export default function Timer({ intervalRef, restart, count, setCount }) {
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [count, setCount, intervalRef]);

  return (
    <div className={styles.timer}>
      <p>
        Duration: <span>{count}</span>
      </p>
      <button onClick={restart}>Reset</button>
    </div>
  );
}
