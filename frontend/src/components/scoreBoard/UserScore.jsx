import styles from './ScoreBoard.module.css';
import Modal from '../modal/Modal';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserScore = ({ count, marks, intervalRef, restart }) => {
  const navigate = useNavigate();
  const isComplete = marks.length === 4;

  useEffect(() => {
    if (isComplete) {
      clearInterval(intervalRef.current);
    }
  }, [isComplete, intervalRef]);

  return (
    <Modal openModal={isComplete} className={styles.modal}>
      <div>
        <h2>✅ Scene Complete!</h2>
        <p>You found all 4 characters!</p>
        <p>
          Time: <span>{count}</span>
        </p>
        <button onClick={() => restart()}>Play again</button>
        <button onClick={() => navigate('/')}>Back to lobby</button>
      </div>
    </Modal>
  );
};

export default UserScore;
