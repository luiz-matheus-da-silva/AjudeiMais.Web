import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const FormSecurityData = ({ values, onChange, onSubmit, isLoading }) => (
  <form className="space-y-4" onSubmit={onSubmit}>
    <div>
      <Label htmlFor="senhaAtual">Senha Atual</Label>
      <Input
        id="senhaAtual"
        name="senhaAtual"
        type="password"
        value={values.senhaAtual}
        onChange={onChange}
        required
      />
    </div>
    <div>
      <Label htmlFor="novaSenha">Nova Senha</Label>
      <Input
        id="novaSenha"
        name="novaSenha"
        type="password"
        value={values.novaSenha}
        onChange={onChange}
        required
      />
    </div>
    <div>
      <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
      <Input
        id="confirmarSenha"
        name="confirmarSenha"
        type="password"
        value={values.confirmarSenha}
        onChange={onChange}
        required
      />
    </div>
    <Button type="submit" className="w-full" disabled={isLoading}>
      Alterar Senha
    </Button>
  </form>
);

export default FormSecurityData;