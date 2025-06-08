// src/components/auth/RegisterStep2.jsx
import React from "react";
import FormField from "../../components/FormField";
import { MapPin, Phone } from "lucide-react"; // Mantenha os ícones que já usa

export default function RegisterStep2({
  form,
  handleChange,
  searchCEP, // Função para buscar CEP
  setForm,
  setErrors,
  errors,
}) {
  // Adapta a função onBlur para o FormField
  const handleCepBlur = () => {
    // Certifique-se de que a lógica de validação de 8 dígitos ainda está aqui
    // antes de chamar searchCEP, para evitar chamadas desnecessárias à API.
    const cleanedCep = form.CEP ? form.CEP.replace(/\D/g, '') : '';
    if (cleanedCep.length === 8) {
        searchCEP(cleanedCep, setForm, setErrors);
    } else if (cleanedCep.length > 0 && cleanedCep.length < 8) {
        setErrors((prevErrors) => ({ ...prevErrors, CEP: "CEP inválido. Deve conter 8 dígitos." }));
    }
  };

  return (
    <>
      <h3 className="text-3xl font-heading text-primary-dark text-center mb-6 flex items-center justify-center gap-2">
        <MapPin size={24} className="text-secondary" /> Endereço
      </h3>

      <div className="space-y-5">
        {/* Campo CEP */}
        <FormField
          id="CEP"
          name="CEP"
          type="text"
          placeholder="Somente números: XXXXX-XXX"
          value={form.CEP}
          onChange={handleChange}
          error={errors.CEP}
          maxLength={9} // CEP pode ter máscara, mas o FormField trata maxLength
          onBlur={handleCepBlur} // Passa a função onBlur
          // Nota: O required é implícito pelo FormField, mas se o seu validator permitir vazio, ajuste
        />

        {/* Link "Não sei meu CEP" */}
        <div className="flex justify-end -mt-3 mb-4"> {/* Ajustado margens para posicionamento */}
          <a
            href="https://buscacepinter.correios.com.br/app/endereco/index.php"
            target="_blank" // Abre em uma nova aba
            rel="noopener noreferrer" // Segurança para abrir em nova aba
            className="text-sm text-secondary hover:text-secondary-dark hover:underline font-medium transition-colors duration-200"
          >
            Não sei meu CEP
          </a>
        </div>

        {/* Div para Rua e Número */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            id="Rua"
            name="Rua"
            type="text"
            placeholder="Nome da Rua/Avenida"
            value={form.Rua}
            onChange={handleChange}
            error={errors.Rua}
            readOnly={true} // Marca como somente leitura
            // Adiciona uma classe para o fundo cinza, se necessário
            className="bg-customGray-200"
          />
          <FormField
            id="Numero"
            name="Numero"
            type="number"
            placeholder="Ex: 123"
            value={form.Numero}
            onChange={handleChange}
            error={errors.Numero}
            required={true}
          />
        </div>

        {/* Campo Complemento */}
        <FormField
          id="Complemento"
          name="Complemento"
          type="text"
          placeholder="Ex: Apt 101, Bloco B"
          value={form.Complemento}
          onChange={handleChange}
          error={errors.Complemento}
          required={false} // Campo opcional
        />

        {/* Div para Bairro e Cidade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            id="Bairro"
            name="Bairro"
            type="text"
            placeholder="Ex: Centro"
            value={form.Bairro}
            onChange={handleChange}
            error={errors.Bairro}
            readOnly={true}
            className="bg-customGray-200"
          />
          <FormField
            id="Cidade"
            name="Cidade"
            type="text"
            placeholder="Ex: Londrina"
            value={form.Cidade}
            onChange={handleChange}
            error={errors.Cidade}
            readOnly={true}
            className="bg-customGray-200"
          />
        </div>

        {/* Campo Estado */}
        <FormField
          id="Estado"
          name="Estado"
          type="text"
          placeholder="Ex: PR"
          value={form.Estado}
          onChange={handleChange}
          error={errors.Estado}
          readOnly={true}
          className="bg-customGray-200"
        />
      </div>
    </>
  );
}