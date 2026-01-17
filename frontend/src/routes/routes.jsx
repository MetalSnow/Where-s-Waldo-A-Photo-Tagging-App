import App from '../App';
import Scenario from '../components/scenarios/Senario';
import ErrorPage from '../error/ErrorPage';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/scenarios/:id',
    element: <Scenario />,
  },
];

export default routes;
