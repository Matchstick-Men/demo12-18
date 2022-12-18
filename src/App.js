import { useRoutes } from 'react-router-dom';
import './App.css';
import routers from './pages/router';

function App() {
  const elements = useRoutes(routers)
  return (
    <div className="App">
      {elements}

    </div>
  );
}

export default App;
