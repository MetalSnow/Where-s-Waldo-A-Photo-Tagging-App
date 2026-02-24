import { LoaderCircle } from 'lucide-react';
import useFetch from '../../hooks/useFetch';
import Header from '../header/Header';
import styles from './ScoreBoard.module.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ScoreBoard = () => {
  const { data, loading, error } = useFetch(`${API_BASE_URL}/users`);

  return (
    <>
      <Header />
      <div className={styles.ScoreBoard}>
        {error ? (
          <p>A network error was encountered</p>
        ) : loading ? (
          <LoaderCircle size={30} strokeWidth={2.5} className={styles.loader} />
        ) : (
          <>
            <div className={styles.leaderboard}>
              <h3>Beach Scene</h3>
              <table className={styles.scoreTable}>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Scene Score</th>
                  </tr>
                </thead>
                <tbody>
                  {data.users
                    .sort((a, b) => b.beachScore - a.beachScore)
                    .map((user) => (
                      <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.beachScore}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className={styles.leaderboard}>
              <h3>Skiing Scene</h3>
              <table className={styles.scoreTable}>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Scene Score</th>
                  </tr>
                </thead>
                <tbody>
                  {data.users
                    .sort((a, b) => b.skiingScore - a.skiingScore)
                    .map((user) => (
                      <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.skiingScore}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className={styles.leaderboard}>
              <h3>Space Scene</h3>
              <table className={styles.scoreTable}>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Scene Score</th>
                  </tr>
                </thead>
                <tbody>
                  {data.users
                    .sort((a, b) => b.spaceScore - a.spaceScore)
                    .map((user) => (
                      <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.spaceScore}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ScoreBoard;
