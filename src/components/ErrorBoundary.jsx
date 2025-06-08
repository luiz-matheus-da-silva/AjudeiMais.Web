// src/pages/ErrorPage.jsx
import React from "react";
import { Button } from "@/components/ui/button"; // Assuming Button is part of shadcn/ui or a similar library

export default function ErrorPage() {
  const handleGoHome = () => {
    // This is generally fine for a simple "go home" action.
    // If you're using React Router or similar, you might use:
    // navigate('/') or window.location.replace('/') for cleaner history.
    window.location.href = "/";
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6
                 bg-gradient-to-br from-primary-dark via-primary to-secondary-dark
                 text-white font-base animate-gradient-xy"
    >
      {/* Animated Logo Icon (replace with your actual SVG logo) */}
      {/* This is a placeholder; you'd replace the SVG paths with your logo. */}
      {/* The animation classes come directly from your tailwind.config.js */}
      <svg
        className="w-24 h-24 text-accent animate-pulse mb-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor" // Changed to fill to better match logo styling
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {/* Replace these paths with your actual logo's SVG paths */}
        {/* For demonstration, I'm keeping a stylized "A" for "Accent" */}
        <path d="M12 2L1 21h22L12 2zm0 6.83L17.5 18H6.5L12 6.83z" />
        <circle cx="12" cy="15" r="2" />
      </svg>

      <h1 className="text-4xl font-heading text-secondary-light mb-4 text-center drop-shadow-lg">
        Oops! Algo deu errado.
      </h1>
      <p className="max-w-md text-center text-customGray-200 mb-8 text-lg">
        Estamos trabalhando para resolver isso o mais rápido possível. Enquanto isso, você pode voltar para a página inicial.
      </p>

      <Button
        onClick={handleGoHome}
        // Using your custom colors for the button
        className="inline-flex items-center
                   bg-secondary hover:bg-hover focus:ring-4 focus:ring-focus
                   text-primary-dark font-accent font-bold px-6 py-3 rounded-md
                   shadow-lg transition-all duration-300 ease-in-out select-none
                   focus:outline-none transform hover:scale-105"
        aria-label="Voltar para a página inicial"
      >
        {/* Refresh icon with a subtle spin animation */}
        <svg
          className="w-6 h-6 mr-3 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v6h6M20 20v-6h-6"
          />
        </svg>
        Voltar para a página inicial
      </Button>
    </div>
  );
}