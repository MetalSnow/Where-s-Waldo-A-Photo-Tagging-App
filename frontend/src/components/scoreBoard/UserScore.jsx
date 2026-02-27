import styles from './ScoreBoard.module.css';
import Modal from '../modal/Modal';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import usePost from '../../hooks/usePost';
import { LoaderCircle } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const UserScore = ({ count, marks, intervalRef, restart, sceneName }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;
  const { action, error, isLoading } = usePost(
    `${API_BASE_URL}/users/${userId}/score`,
    'PATCH',
  );
  const isComplete = marks.length === 4;
  const minutes = Math.floor(count / 60);
  const remainingSeconds = count % 60;

  useEffect(() => {
    if (!isComplete) return;

    clearInterval(intervalRef.current);

    const post = async () => {
      if (!userId) return;
      try {
        await action({
          scoreName: `${sceneName.toLowerCase()}Score`,
          score: count,
        });
      } catch (error) {
        console.error(error);
      }
    };

    post();
  }, [isComplete]);

  return (
    <Modal openModal={isComplete} className={styles.modal}>
      <div>
        <h2>✅ Scene Complete!</h2>
        <p>You found all 4 characters!</p>
        <p>
          Time: <span>{`${minutes} Minutes, ${remainingSeconds} Seconds`}</span>
        </p>
        {error ? (
          <button>
            <Link style={{ color: 'white' }} to={'/'}>
              Set a username
            </Link>
          </button>
        ) : isLoading ? (
          <LoaderCircle size={30} strokeWidth={2.5} className={styles.loader} />
        ) : (
          <>
            <button onClick={() => restart()}>Play again</button>
            <button onClick={() => navigate('/')}>Back to lobby</button>
          </>
        )}
      </div>
    </Modal>
  );
};

export default UserScore;
