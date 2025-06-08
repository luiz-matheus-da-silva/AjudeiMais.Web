// src/components/ErrorBoundary.jsx
import React from 'react';
import { Bug, RefreshCcw } from 'lucide-react'; // Importe os ícones necessários
import { Button } from "@/components/ui/button"; // Assumindo seu componente Button

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Erro capturado pelo Error Boundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex flex-col items-center justify-center min-h-screen p-6
                     bg-gradient-to-br from-primary-dark via-primary to-secondary-dark
                     text-white font-base animate-gradient-xy"
        >
          {/* Ícone de Bug Animado */}
          <Bug size={96} className="text-danger mb-6 animate-bounce" />

          <h1 className="text-4xl md:text-5xl font-heading text-secondary-light mb-4 text-center drop-shadow-lg">
            Oops! Algo deu muito errado.
          </h1>
          <p className="max-w-md text-center text-customGray-200 mb-8 text-lg font-base">
            Parece que encontramos um problema inesperado. Por favor, tente recarregar a página.
            Se o problema persistir, entre em contato com o suporte.
          </p>

          {/* Botão de Recarregar */}
          <Button
            onClick={() => window.location.reload()}
            className="inline-flex items-center
                       bg-danger hover:bg-red-700 focus:ring-4 focus:ring-focus
                       text-white font-accent font-bold px-6 py-3 rounded-md
                       shadow-lg transition-all duration-300 ease-in-out select-none
                       focus:outline-none transform hover:scale-105"
            aria-label="Recarregar a página"
          >
            <RefreshCcw size={20} className="mr-3 animate-spin-slow" /> {/* Ícone de refresh com animação */}
            Recarregar Página
          </Button>

          {/* Detalhes do Erro (Apenas em Desenvolvimento) */}
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details
              className="mt-8 p-6 bg-customGray-900/70 backdrop-blur-sm rounded-lg border border-customGray-700
                         text-customGray-100 max-w-lg overflow-auto shadow-xl"
            >
              <summary className="font-semibold cursor-pointer text-accent hover:text-accent-light transition-colors duration-200">
                Detalhes Técnicos do Erro (somente em desenvolvimento)
              </summary>
              <pre className="mt-4 text-sm font-mono whitespace-pre-wrap break-words">
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    // Se não houver erro, renderiza os componentes filhos normalmente.
    return this.props.children;
  }
}

export default ErrorBoundary;