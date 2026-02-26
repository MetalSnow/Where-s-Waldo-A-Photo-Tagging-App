import { ArrowBigRight, LoaderCircle } from 'lucide-react';
import useFetch from '../../hooks/useFetch';
import Header from '../header/Header';
import styles from './ScoreBoard.module.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ScoreBoard = () => {
  const { data, loading, error } = useFetch(`${API_BASE_URL}/users`);
  const currentUser = JSON.parse(localStorage.getItem('user')).username;

  return (
    <>
      <Header />
      <div className={styles.scoreBoard}>
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
                    .sort((a, b) => a.beachScore - b.beachScore)
                    .map((user) => (
                      <tr
                        key={user.id}
                        style={{
                          color: user.username == currentUser && '#3f85d5',
                        }}
                      >
                        <td>
                          {' '}
                          <div>
                            {user.username == currentUser && (
                              <ArrowBigRight size={16} strokeWidth={3} />
                            )}
                            {user.username}
                          </div>
                        </td>
                        <td>
                          {Math.floor(user.beachScore / 60)} mins{' '}
                          {user.beachScore % 60} secs
                        </td>
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
                    .sort((a, b) => a.skiingScore - b.skiingScore)
                    .map((user) => (
                      <tr
                        key={user.id}
                        style={{
                          color: user.username == currentUser && '#3f85d5',
                        }}
                      >
                        <td>
                          <div>
                            {user.username == currentUser && (
                              <ArrowBigRight size={16} strokeWidth={3} />
                            )}
                            {user.username}
                          </div>
                        </td>
                        <td>
                          {Math.floor(user.skiingScore / 60)} mins{' '}
                          {user.skiingScore % 60} secs
                        </td>
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
                    .sort((a, b) => a.spaceScore - b.spaceScore)
                    .map((user) => (
                      <tr
                        key={user.id}
                        style={{
                          color: user.username == currentUser && '#3f85d5',
                        }}
                      >
                        <td>
                          {' '}
                          <div>
                            {user.username == currentUser && (
                              <ArrowBigRight size={16} strokeWidth={3} />
                            )}
                            {user.username}
                          </div>
                        </td>
                        <td>
                          {Math.floor(user.spaceScore / 60)} mins{' '}
                          {user.spaceScore % 60} secs
                        </td>
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
