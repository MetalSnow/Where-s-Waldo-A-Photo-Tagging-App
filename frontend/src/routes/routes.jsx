import App from '../App';
import Scenario from '../components/scenarios/Senario';
import ScoreBoard from '../components/scoreBoard/ScoreBoard';
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
  {
    path: '/score-board',
    element: <ScoreBoard />,
  },
];

export default routes;
