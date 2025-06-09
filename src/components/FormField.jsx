// components/FormField.jsx
import React from "react";
import { Eye, EyeOff } from "lucide-react"; // Importe os ícones de olho

export default function FormField({
  id,
  name,
  label,
  type, // Este `type` vai determinar se é password ou text
  placeholder,
  value,
  onChange,
  error,
  required,
  isPassword,     // Indica se o campo é de senha
  showToggle,     // Indica se deve mostrar o toggle do olho
  toggleFunction, // Função para alternar a visibilidade da senha
  readOnly,
  maxLength,
  className,      // Adicionei className para permitir estilos no container do FormField
  ...props
}) {
  return (
    // Aplique o 'relative' ao div que envolve o input e o botão do olho
    // Removi o 'form-field-container' e usei 'relative' diretamente.
    // O 'className' passado nas props do FormField agora é aplicado aqui.
    <div className={`relative ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type} // O tipo do input é controlado pela prop 'type'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        maxLength={maxLength}
        className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent sm:text-sm ${
          error ? "border-red-500" : ""
        } ${isPassword && showToggle ? "pr-10" : ""}`} 
        {...props}
      />

      {/* Lógica para o ícone de olho */}
      {isPassword && showToggle && (
        <button
          type="button"
          onClick={toggleFunction}
          // Posicione o botão de forma absoluta dentro do container relativo
          // Use 'absolute inset-y-0 right-0' para centralizar verticalmente no input
          // 'pr-3' para padding à direita
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          aria-label={type === "password" ? "Mostrar senha" : "Esconder senha"}
        >
          {/* Adiciona uma condição para quando o label existe, para ajustar o top */}
          {label ? (
            <span className="mt-6 flex items-center"> {/* Ajuste o margin-top para alinhar se houver label */}
                {type === "password" ? (
                    <EyeOff className="h-5 w-5 text-gray-400" /> // Ícone para "esconder"
                ) : (
                    <Eye className="h-5 w-5 text-gray-400" /> // Ícone para "mostrar"
                )}
            </span>
          ) : (
            // Se não houver label, o posicionamento padrão inset-y-0 funciona bem
            <>
                {type === "password" ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                )}
            </>
          )}
        </button>
      )}

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}