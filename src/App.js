import { useRoutes } from 'react-router-dom';
import './App.css';
import routesMap from './pages/router';

function App() {
  return (
    <div className="App">
      {routesMap}
    </div>
  );
}

export default App;
