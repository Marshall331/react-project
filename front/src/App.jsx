import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Solo from './pages/Solo';
import Multiplayer from './pages/Multiplayer';
import Header from './components/layout/Header';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solo" element={<Solo />} />
            <Route path="/multiplayer" element={<Multiplayer />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
