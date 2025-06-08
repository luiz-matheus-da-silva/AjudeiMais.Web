// src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom"; // Importe Link do react-router-dom
import { Button } from "@/components/ui/button"; // Assumindo que você usa shadcn/ui ou similar
import { Frown, HomeIcon } from "lucide-react"; // Um ícone que sugere "não encontrado"

export default function NotFoundPage() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6
                 bg-gradient-to-br from-primary-dark via-primary to-secondary-dark
                 text-white font-base animate-gradient-xy"
    >
      {/* Ícone ou Ilustração para 404 */}
      <Frown size={96} className="text-secondary-light mb-6 animate-bounce" />

      <h1 className="text-6xl font-heading text-secondary-light mb-4 text-center drop-shadow-lg">
        404
      </h1>
      <h2 className="text-4xl font-heading text-secondary-light mb-4 text-center drop-shadow-lg">
        Página Não Encontrada
      </h2>
      <p className="max-w-md text-center text-customGray-200 mb-8 text-lg">
        Parece que a página que você está procurando não existe ou foi movida.
        Não se preocupe, vamos te ajudar a voltar para o caminho certo!
      </p>

      {/* Botão para Voltar à Home */}
      <Link to="/"> {/* Usamos <Link> para navegação interna no React Router */}
        <Button
          className="inline-flex items-center
                     bg-secondary hover:bg-hover focus:ring-4 focus:ring-focus
                     text-primary-dark font-accent font-bold px-6 py-3 rounded-md
                     shadow-lg transition-all duration-300 ease-in-out select-none
                     focus:outline-none transform hover:scale-105"
          aria-label="Voltar para a página inicial"
        >
          {/* Ícone de Casa ou Seta de Volta */}
          <HomeIcon size={24} className="mr-2" />
          Voltar para a Página Inicial
        </Button>
      </Link>
    </div>
  );
}