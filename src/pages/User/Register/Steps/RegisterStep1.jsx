// src/components/auth/RegisterStep1.jsx
import React from "react"; // Certifique-se de importar React
import FormField from "../../../../components/FormField"; // Importe o novo componente FormField
import { Phone } from "lucide-react";

export default function RegisterStep1({
  form,
  errors,
  handleChange
}) {
  return (
    <>
      <h3 className="text-3xl font-heading text-primary-dark text-center mb-6">
        Informações Essenciais
      </h3>

      <div className="space-y-5">
        <FormField
          id="NomeCompleto"
          name="NomeCompleto"
          type="text"
          placeholder="Seu nome completo"
          value={form.NomeCompleto}
          onChange={handleChange}
          error={errors.NomeCompleto}
        />
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
  <FormField
    id="Documento"
    name="Documento"
    type="text"
    placeholder="XXX.XXX.XXX-XX"
    value={form.Documento}
    onChange={handleChange}
    error={errors.Documento}
    maxLength={14}
    className="col-span-1 md:col-span-2"
  />

  <FormField
    id="Email"
    name="Email"
    type="email"
    placeholder="seuemail@exemplo.com"
    value={form.Email}
    onChange={handleChange}
    error={errors.Email}
    className="col-span-1 md:col-span-3"
  />
</div>
        <hr className="border-customGray-300 my-4" />

        <h4 className="text-xl font-semibold text-customGray-800 flex items-center gap-2 mb-2">
          <Phone size={20} className="text-primary" /> Contato
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Campo Telefone Celular */}
          <FormField
            id="Telefone"
            name="Telefone"
            type="tel"
            placeholder="(XX) XXXXX-XXXX"
            value={form.Telefone}
            onChange={handleChange}
            error={errors.Telefone}
            required={true}
          />
          {/* Campo Telefone Fixo */}
          <FormField
            id="TelefoneFixo"
            name="TelefoneFixo"
            type="tel"
            placeholder="(XX) XXXX-XXXX"
            value={form.TelefoneFixo}
            onChange={handleChange}
            error={errors.TelefoneFixo} // Mesmo sendo opcional, ainda pode ter validação de formato
            required={false} // Campo opcional
          />
        </div>
      </div>
    </>
  );
}
