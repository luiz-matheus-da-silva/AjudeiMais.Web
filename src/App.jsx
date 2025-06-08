// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { UserProvider, useUser } from "./contexts/UserContext"; // Certifique-se que está importado
import NotFoundPage from "./pages/NotFoundPage";
import RegisterStepper from "./pages/User/Register/Register";
import Login from "./pages/Login";
import UserProfile from "./pages/User/Profile/UserProfile";
import UserNavbar from "./pages/User/UserNavbar";

function App() {
  return (
    <Router>
      <AuthProvider>
        {" "}
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

function AppContent() {
  const { isLoggedIn, userGuid, userRole, logout, loadingUserProfile } =
    useAuth();

  return (
    <UserProvider userId={userGuid} isLoggedIn={isLoggedIn}>
      <InnerAppContent />
    </UserProvider>
  );
}

function InnerAppContent() {
  const { isLoggedIn, userGuid, userRole, logout } = useAuth();
  const { user, loadingUser } = useUser();

  if (loadingUser) {
    return (
      <div className="flex items-center justify-center h-screen text-primary-dark font-accent text-lg">
        Carregando informações do usuário...
      </div>
    );
  }

  return (
    <>
      {isLoggedIn &&
        user && (
          <UserNavbar
            userName={user.nomeCompleto} 
            userAvatar={import.meta.env.VITE_API_SERVER_URL + user.fotoDePerfil}
            onLogout={logout}
            userGuid={user.guid}
          />
        )}
      <div className={`${isLoggedIn ? "pt-16" : ""}`}>
        <ErrorBoundary>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/usuario/criar-conta" element={<RegisterStepper />} />

            {/* Rotas Protegidas */}
            {isLoggedIn ? (
              <>
                <Route
                  path="/usuario/meu-perfil/:guid"
                  element={<UserProfile />}
                />
                <Route path="/usuario/meu-perfil" element={<UserProfile />} />
              </>
            ) : (
              <Route path="*" element={<Login />} />
            )}

            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;
