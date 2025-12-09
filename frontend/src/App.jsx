import { Routes, Route } from 'react-router-dom';
import SalesPage from './pages/SalesPage';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<SalesPage />} />
      </Routes>
    </div>
  );
}

export default App;
