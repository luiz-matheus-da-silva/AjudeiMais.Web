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
        {/* AuthProvider é o pai */}
        {/*
          Aqui passamos userGuid e token (se disponível) do AuthProvider para o UserProvider.
          O AuthProvider NÃO usará useUser(), mas sim passará os dados para seu filho.
        */}
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

// Componente separado para usar os hooks de contexto
function AppContent() {
  const { isLoggedIn, userGuid, userRole, logout, loadingUserProfile } =
    useAuth(); // AuthContext
  // UserProvider agora é um CHILD do AuthProvider
  // e receberá props do AppContent para carregar os detalhes do usuário
  // ou pode apenas tentar carregar se userGuid estiver no localStorage (como já está)

  return (
    // Passar o userGuid para o UserProvider como prop
    <UserProvider userId={userGuid} isLoggedIn={isLoggedIn}>
      {/* Agora, o UserNavbar e o UserProfile podem usar useUser() */}
      <InnerAppContent />
    </UserProvider>
  );
}

// Novo componente para renderizar o restante da aplicação
// Isso garante que o UserProvider esteja montado antes dos componentes que usam useUser
function InnerAppContent() {
  const { isLoggedIn, userGuid, userRole, logout } = useAuth();
  const { user, loadingUser } = useUser();

  // Uma pequena condição para exibir um loader global se ambos os contextos estiverem carregando
  // (Isso impede que o UserNavbar seja renderizado com dados vazios)
  if (loadingUser) {
    // loadingUserProfile é um conceito mais abstrato, loadingUser é mais direto
    return (
      <div className="flex items-center justify-center h-screen text-primary-dark font-accent text-lg">
        Carregando informações do usuário...
      </div>
    );
  }

  return (
    <>
      {/* UserNavbar só é renderizado se estiver logado e os dados do usuário estiverem disponíveis */}
      {isLoggedIn &&
        user && ( // `user` vem do `useUser()`
          <UserNavbar
            userName={user.nomeCompleto} // Pega o nome do user do UserContext
            userAvatar={import.meta.env.VITE_API_SERVER_URL + user.fotoDePerfil} // Pega o avatar do user do UserContext
            onLogout={logout}
            userGuid={user.guid}
          />
        )}
      <div className="pt-16">
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
