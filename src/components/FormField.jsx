// src/components/ui/FormField.jsx (ou FormField.tsx)
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, XCircle } from "lucide-react";

export default function FormField({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
  onBlur,
  maxLength,
  isPassword = false,
  showToggle = false,
  toggleFunction = null,
  readOnly = false,
  className: inputClassName = '', // Renomeado para evitar conflito com 'className' de estilo externo
  required = true,
}) {
  const getLabelText = (fieldId) => {
    switch (fieldId) {
      case "NomeCompleto": return "Nome Completo";
      case "Documento": return "CPF";
      case "Email": return "Email";
      case "Senha": return "Senha";
      case "ConfirmarSenha": return "Confirmar Senha";
      case "CEP": return "CEP";
      case "Rua": return "Rua";
      case "Numero": return "Número";
      case "Complemento": return "Complemento (Opcional)";
      case "Bairro": return "Bairro";
      case "Cidade": return "Cidade";
      case "Estado": return "Estado (UF)";
      case "TelefoneFixo": return "Telefone Fixo (Opcional)";
      case "Telefone": return "Telefone Celular";
      default:
        return id;
    }
  };

  return (
    <div className={inputClassName}>
      <Label
        htmlFor={id}
        className="text-customGray-700 font-semibold mb-2 block"
      >
        {getLabelText(id)}
      </Label>
      <div className="relative group">
        <Input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur} // <--- ADICIONE ESTA LINHA AQUI!
          required={required} // Adicione esta prop aqui
          maxLength={maxLength}
          readOnly={readOnly} // Adicione esta prop aqui
          className={`w-full p-3.5 ${isPassword ? 'pr-12' : 'pr-10'} rounded-lg focus:ring-2 transition-all duration-200 text-customGray-800 placeholder-customGray-500
            ${error ? 'border-danger focus:ring-danger-light' : 'border-customGray-400 focus:ring-secondary focus:border-secondary-light'}
            ${inputClassName} `}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {isPassword && showToggle && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-customGray-600 hover:text-primary-dark transition-colors duration-200"
            onClick={toggleFunction}
            aria-label={type === "password" ? "Mostrar senha" : "Esconder senha"}
          >
            {type === "password" ? <Eye size={22} /> : <EyeOff size={22} />}
          </button>
        )}
        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-danger cursor-help z-10">
            <XCircle size={20} />
            <span
              id={`${id}-error`}
              role="alert"
              className="absolute hidden group-hover:block -right-2 transform translate-x-full mt-2 w-max max-w-[200px] p-2 bg-danger text-white text-xs rounded-md shadow-lg z-20 whitespace-normal"
            >
              {error}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}