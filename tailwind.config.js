// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ESSENCIAL: Configure esses caminhos para apontar para TODOS os seus arquivos
    // que contêm classes Tailwind (HTML, JS, JSX, TS, TSX, Vue, Svelte, etc.)
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Exemplo: se você tem componentes em uma pasta 'components'
    // "./components/**/*.{js,ts,jsx,tsx}",
    // E páginas em uma pasta 'pages'
    // "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Defina suas cores personalizadas diretamente com valores hex, rgb, hsl, etc.
      colors: {
        primary: {
          DEFAULT: '#002147',
          light: '#344B75',
          dark: '#000F2E',
        },
        secondary: {
          DEFAULT: '#7D83FF',
          light: '#A3A8FF',
          dark: '#5A5FFF',
        },
        accent: {
          DEFAULT: '#62D58E',
          light: '#8BE0B0',
          dark: '#3EA26A',
        },
        customGray: { // Nome customizado para seus tons de cinza
          100: '#FFFFFF',
          200: '#F2F2F2',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
        success: '#28A745',
        warning: '#FFC107',
        danger: '#DC3545',
        info: '#17A2B8',
        surface: '#FFFFFF', // Cor para cards, modais
        hover: '#A3A8FF', // Cor para estados de hover
        focus: '#FFD54F', // Cor para outlines de acessibilidade
        white: '#FFFFFF', // Alias para 'white'
      },
      // Defina suas fontes personalizadas
      fontFamily: {
        base: ['Nunito', 'sans-serif'],
        heading: ['Merriweather', 'serif'],
        accent: ['Quicksand', 'sans-serif'],
      },
      // Mantenha seus espaçamentos e radii se quiser sobrescrever os padrões do Tailwind
      spacing: {
        'xxs': '0.25rem',
        'xs': '0.5rem',
        'sm': '0.75rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        'xxl': '3rem',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0,0,0,0.05)',
        'md': '0 4px 8px rgba(0,0,0,0.1)',
        'lg': '0 8px 16px rgba(0,0,0,0.15)',
      },
      // Adicione suas animações e keyframes diretamente aqui
      keyframes: {
        'gradient-xy': {
          '0%, 100%': { 'background-position': 'left top' },
          '50%': { 'background-position': 'right bottom' },
        }
      },
      animation: {
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
    },
  },
  plugins: [],
};