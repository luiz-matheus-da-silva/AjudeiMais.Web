// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// REMOVIDO: import { useUser } from './UserContext';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userGuid, setUserGuid] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // REMOVIDO: Acesso às funções do UserContext
  // const { saveUserData, clearUserData: clearUserProfileData, loadingUser: loadingUserProfile } = useUser();

  // Efeito para carregar dados de autenticação do localStorage ao montar o componente
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserGuid = localStorage.getItem('userGUID');
    const storedUserRole = localStorage.getItem('role');

    if (storedToken && storedUserGuid && storedUserRole) {
      setIsLoggedIn(true);
      setUserGuid(storedUserGuid);
      setUserRole(storedUserRole);
      // NÃO CHAME saveUserData/clearUserProfileData aqui
      // O UserContext fará sua própria inicialização ou receberá props do AppContent
    }
  }, []); // Sem dependências para funções do UserContext

  // Função para efetuar login
  const login = (loginData) => {
    setIsLoggedIn(true);
    setUserGuid(loginData.guid);
    setUserRole(loginData.role);

    localStorage.setItem('token', loginData.token);
    localStorage.setItem('userGUID', loginData.guid);
    localStorage.setItem('role', loginData.role);

    // NÃO CHAME saveUserData aqui
  };

  // Função para efetuar logout
  const logout = () => {
    setIsLoggedIn(false);
    setUserGuid(null);
    setUserRole(null);

    localStorage.removeItem('token');
    localStorage.removeItem('userGUID');
    localStorage.removeItem('role');
    sessionStorage.removeItem('token');

    // NÃO CHAME clearUserProfileData aqui
  };

  const authContextValue = {
    isLoggedIn,
    userGuid, // userGuid será crucial para o UserProvider
    userRole,
    login,
    logout,
    // REMOVIDO: loadingUserProfile
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider. Make sure AuthProvider wraps your components.');
  }
  return context;
};