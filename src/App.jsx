// src/App.js (ou o arquivo principal que renderiza suas rotas)
import React from 'react';
import ErrorBoundary from './components/ErrorBoundary'; // Ajuste o caminho se necessário
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage'; // Para 404
import RegisterStepper from './pages/User/Register/Register';
import Login from './pages/Login';
import UserProfile from './pages/User/Profile/UserProfile';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* USERS */}
          <Route path="/usuario/criar-conta" element={<RegisterStepper />} />
          <Route path="/usuario/meu-perfil" element={<UserProfile />} />
          {/* ERRORS */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;