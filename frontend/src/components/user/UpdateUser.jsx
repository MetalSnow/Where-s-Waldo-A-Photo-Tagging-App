import Modal from '../modal/Modal';
import styles from './UserLogin.module.css';
import usePost from '../../hooks/usePost';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const UpdateUser = ({ modal, setModal }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { action, error, isLoading } = usePost(
    `${API_BASE_URL}/users/${user.id}/username`,
    'PATCH',
  );

  const submitData = async (formData) => {
    const username = formData.get('username');

    try {
      const data = await action({ username });
      const user = { id: data.user.id, username: data.user.username };
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(user));
      console.log(data);
      setModal(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal
      openModal={modal}
      closeModal={() => setModal(false)}
      keyboard={false}
    >
      <form action={submitData}>
        <h2>Change username</h2>
        {error && <p>A network error was encountred!</p>}
        <label htmlFor="username">New Username:</label>
        <input
          id="username"
          name="username"
          type="text"
          minLength="3"
          required
        />
        {isLoading ? (
          <LoaderCircle size={20} strokeWidth={2.5} className={styles.loader} />
        ) : (
          <button type="submit">Confirm</button>
        )}
        <button
          type="button"
          onClick={() => {
            setModal(false);
          }}
        >
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default UpdateUser;
