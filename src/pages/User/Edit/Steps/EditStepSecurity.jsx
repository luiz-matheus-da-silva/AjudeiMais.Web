import React, { useState } from "react";
import { Lock } from "lucide-react"; // Assuming lucide-react is installed for icons
import { Button } from "@/components/ui/button"; // Adjust path if necessary
import FormField from "../../../../components/FormField"; // Adjust path if necessary

export default function EditStepSecurity({ values, onChange, onSubmit, onPrev, isLoading }) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return (
    <form className="space-y-7 max-w-lg mx-auto" onSubmit={onSubmit} autoComplete="off">
      <div className="flex items-center gap-3 mb-4">
        <Lock className="w-8 h-8 text-accent" />
        <h2 className="font-heading text-xl text-primary-dark font-bold">
          Alterar Senha
        </h2>
      </div>

      {/* Campo para Senha Atual */}
      <FormField
        label="Senha Atual" // Adicione um label para melhor UX
        id="senhaAtual"
        name="senhaAtual" // Use camelCase para corresponder ao estado do React
        type={showCurrentPassword ? "text" : "password"}
        placeholder="••••••••"
        value={values.senhaAtual || ""} // **CORREÇÃO: Use o valor do prop 'values'**
        onChange={onChange}
        isPassword
        showToggle
        toggleFunction={() => setShowCurrentPassword((v) => !v)}
        required
      />

      {/* Campo para Nova Senha */}
      <FormField
        label="Nova Senha" // Adicione um label
        id="novaSenha"
        name="novaSenha" // Use camelCase
        type={showNewPassword ? "text" : "password"}
        placeholder="••••••••"
        value={values.novaSenha || ""} // **CORREÇÃO: Use o valor do prop 'values'**
        onChange={onChange}
        isPassword
        showToggle
        toggleFunction={() => setShowNewPassword((v) => !v)} // Agora ambos usam o mesmo estado para toggle
        required
      />

      {/* Campo para Confirmar Nova Senha */}
      <FormField
        label="Confirmar Nova Senha" // Adicione um label
        id="confirmarSenha"
        name="confirmarSenha" // Use camelCase
        type={showNewPassword ? "text" : "password"}
        placeholder="••••••••"
        value={values.confirmarSenha || ""} // **CORREÇÃO: Use o valor do prop 'values'**
        onChange={onChange}
        isPassword
        showToggle
        toggleFunction={() => setShowNewPassword((v) => !v)} // Agora ambos usam o mesmo estado para toggle
        required
      />

      <div className="flex justify-between gap-4 pt-2">
        <Button type="button" variant="outline" onClick={onPrev} disabled={isLoading}>
          Voltar
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 rounded-xl shadow-lg hover:from-secondary hover:to-primary transition-all"
          disabled={isLoading} // Desabilita o botão enquanto carrega
        >
          {isLoading ? "Alterando..." : "Alterar Senha"}
        </Button>
      </div>
    </form>
  );
}