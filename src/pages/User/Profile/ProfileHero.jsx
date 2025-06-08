// src/components/ProfileHero.jsx
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Mail, Phone, MapPin, CheckCircle, XCircle } from 'lucide-react';
import { useUser } from '../../../contexts/UserContext'; 

const ProfileHero = () => {
  const { user, loadingUser, userError } = useUser(); 

  if (loadingUser) {
    return (
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-16 px-4 md:px-8 text-center min-h-[300px] flex items-center justify-center">
        <p className="text-xl font-base">Carregando informações do perfil...</p>
      </section>
    );
  }

  if (userError) {
    return (
      <section className="bg-gradient-to-br from-danger to-red-600 text-white py-16 px-4 md:px-8 text-center min-h-[300px] flex items-center justify-center">
        <p className="text-xl font-base">Erro ao carregar o perfil: {userError}</p>
      </section>
    );
  }

  // Se não houver usuário, talvez não esteja logado ou o GUID seja inválido
  if (!user) {
    return (
      <section className="bg-gradient-to-br from-gray-500 to-gray-700 text-white py-16 px-4 md:px-8 text-center min-h-[300px] flex items-center justify-center">
        <p className="text-xl font-base">Perfil do usuário não encontrado.</p>
      </section>
    );
  }

  // Dados mockados para exemplo se sua API não retornar tudo ainda
  // Substitua por user.propriedade quando sua API retornar os dados
  const nomeCompleto = user.nome || 'Nome do Usuário'; // Assumindo que sua API retorna 'nome'
  const email = user.email || 'usuario@example.com';
  const telefone = user.telefone || '(XX) XXXXX-XXXX';
  const cidade = user.cidade || 'Cidade';
  const estado = user.estado || 'Estado';
  // const estaVerificado = user.verificado || false; 
  // const mediaAvaliacoes = user.mediaAvaliacoes || 4.5;

  // Renderiza as estrelas com base na média de avaliações
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={20} fill="currentColor" className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" size={20} fill="url(#half-star-gradient)" className="text-yellow-400" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={20} className="text-gray-300" />);
    }
    return stars;
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-primary to-secondary text-white py-16 px-4 md:px-8 overflow-hidden shadow-lg">
      {/* Definição do gradiente para meia estrela */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="half-star-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      {/* Conteúdo do Hero - centralizado e organizado */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Coluna da Imagem de Perfil */}
        <div className="flex-shrink-0">
          <Avatar className="w-40 h-40 md:w-48 md:h-48 border-4 border-white shadow-xl">
            <AvatarImage src={user.fotoDePerfil || 'https://via.placeholder.com/150'} alt={nomeCompleto} />
            <AvatarFallback className="bg-primary-dark text-white text-5xl font-heading">
              {nomeCompleto.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Coluna de Detalhes do Perfil */}
        <div className="text-center md:text-left md:flex-grow">
          <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-2">
            {nomeCompleto}
          </h1>
          <p className="text-lg md:text-xl font-base opacity-90 mb-4">
            {user.tipoUsuario === 'instituicao' ? 'Instituição de Caridade' : 'Doador'}
          </p>

          {/* Contato e Localização */}
          <div className="flex flex-col md:flex-row md:flex-wrap justify-center md:justify-start gap-y-2 gap-x-6 mb-4 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-accent" />
              <span>{email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-accent" />
              <span>{telefone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-accent" />
              <span>{cidade}, {estado}</span>
            </div>
          </div>

          {/* Status de Verificação e Avaliações */}
          <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-start gap-4 mt-6">
            <div className="flex items-center gap-2">
              {estaVerificado ? (
                <>
                  <CheckCircle size={20} className="text-green-400" />
                  <Badge className="bg-green-500 hover:bg-green-600 text-white font-semibold">Verificado</Badge>
                </>
              ) : (
                <>
                  <XCircle size={20} className="text-red-400" />
                  <Badge className="bg-red-500 hover:bg-red-600 text-white font-semibold">Não Verificado</Badge>
                </>
              )}
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-lg mr-1">{mediaAvaliacoes.toFixed(1)}</span>
              {renderStars(mediaAvaliacoes)}
              <span className="text-sm ml-2">(123 avaliações)</span> {/* Exemplo de contagem */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Elementos de fundo abstratos (opcional) */}
      <div className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 bg-primary-dark opacity-10 rounded-full blur-3xl z-0 animate-pulse-slow"></div>
      <div className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 bg-secondary-dark opacity-10 rounded-full blur-3xl z-0 animate-pulse-slow delay-500"></div>
    </section>
  );
};

export default ProfileHero;