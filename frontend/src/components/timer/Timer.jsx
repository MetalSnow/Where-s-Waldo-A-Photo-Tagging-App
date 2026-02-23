import { useEffect } from 'react';
import styles from './Times.module.css';

export default function Timer({ intervalRef, restart, count, setCount }) {
  const minutes = Math.floor(count / 60);
  const remainingSeconds = count % 60;

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
        Duration:{' '}
        <span>
          {`${minutes.toString().padStart(2, '0')}:${remainingSeconds
            .toString()
            .padStart(2, '0')}`}
        </span>
      </p>
      <button onClick={restart}>Reset</button>
    </div>
  );
}
