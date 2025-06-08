import { Loader2 } from 'lucide-react';
import React from 'react'

const LoadingSpinner = ({
    message = "Carregando...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 text-gray-700 p-4">
      <Loader2 className="h-12 w-12 text-primary animate-spin-slow mb-4" /> 
      <p className="text-xl font-medium text-center max-w-sm">
        {message}
      </p>
    </div>
  );
}

export default LoadingSpinner