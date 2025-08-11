import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RegistroEntrada from './pages/RegistroEntrada';
import PaseEntrada from './pages/PaseEntrada';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/registro" element={<RegistroEntrada />} />
        <Route path="/pase" element={<PaseEntrada />} />
      </Routes>
    </Router>
  );
}

export default App;
