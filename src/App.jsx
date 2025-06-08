// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/User/Register.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usuario/criar-conta" element={<Register />} />
        <Route path="/error" element={<ErrorBoundary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
