// src/contexts/UserContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

export const UserContext = createContext(null);

// UserProvider agora recebe props
export const UserProvider = ({ children, userId, isLoggedIn }) => { // <--- Adicione userId e isLoggedIn
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [userError, setUserError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const fetchUserByGuid = useCallback(async (guidToFetch) => { // Renomeado para evitar conflito com props
    setLoadingUser(true);
    setUserError(null);

    try {
      if (!guidToFetch) {
        setUser(null);
        setLoadingUser(false);
        return;
      }

      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        setUserError('Token de autenticação não encontrado.');
        setUser(null);
        setLoadingUser(false);
        return;
      }

      const apiUrl = `${API_BASE_URL}/usuario/getByGuid/${encodeURIComponent(guidToFetch)}`;

      const response = await axios.get(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log("Dados do perfil recebidos:", response.data);
      setUser(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados do usuário por GUID:', error);
      setUser(null);
      setUserError(error.response?.data?.message || 'Falha ao carregar dados do perfil.');
    } finally {
      setLoadingUser(false);
    }
  }, [API_BASE_URL]);

  // Função para limpar os dados do usuário (chamada pelo AuthContext através de props se necessário)
  const clearUserProfileData = useCallback(() => {
    setUser(null);
    setUserError(null);
    setLoadingUser(false);
  }, []);


  // useEffect para carregar o usuário quando userId (guid) ou isLoggedIn mudar
  useEffect(() => {
    // Se o usuário estiver logado e tiver um GUID, tente buscar os dados
    if (isLoggedIn && userId) {
      fetchUserByGuid(userId);
    } else {
      // Se não estiver logado ou não houver GUID, limpe os dados do usuário
      clearUserProfileData();
    }
  }, [isLoggedIn, userId, fetchUserByGuid, clearUserProfileData]);


  const contextValue = {
    user,
    // loadUserProfile: fetchUserByGuid, // Se quiser expor uma função para re-buscar
    clearUserProfileData, // Expor para que o AuthContext possa chamar no logout (se ainda quiser essa ligação)
    loadingUser,
    userError,
    refetchUser: fetchUserByGuid // Permite re-buscar o perfil manualmente de qualquer componente
  };

  return (
    <UserContext.Provider value={contextValue}>
      {/* Opcional: Você pode manter um loading global aqui */}
      {loadingUser && !user && (
         <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
           <p className="text-primary-dark font-accent text-lg">Carregando informações do usuário...</p>
         </div>
      )}
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
};