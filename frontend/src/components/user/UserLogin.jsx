import { useState } from 'react';
import usePost from '../../hooks/usePost';
import Modal from '../modal/Modal';
import styles from './UserLogin.module.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const UserLogin = ({ setUsername }) => {
  const [modal, setModal] = useState(() => !localStorage.getItem('user'));
  const { action, error, isLoading } = usePost(`${API_BASE_URL}/users`);

  const submitData = async (formData) => {
    const username = formData.get('username');
    try {
      const data = await action({ username });
      const user = { id: data.user.id, username: data.user.username };
      localStorage.setItem('user', JSON.stringify(user));
      setUsername(data.user.username);
      setModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal openModal={modal} closeModal={() => setModal(false)}>
        <form action={submitData}>
          <h2>Waldo welcomes you!</h2>
          {error && <p>A network error was encountred!</p>}
          <label htmlFor="username">Enter Username:</label>
          <input
            id="username"
            name="username"
            type="text"
            minLength="3"
            required
          />
          {isLoading ? (
            <LoaderCircle
              size={20}
              strokeWidth={2.5}
              className={styles.loader}
            />
          ) : (
            <button type="submit">Start</button>
          )}
        </form>
      </Modal>
    </>
  );
};

export default UserLogin;
