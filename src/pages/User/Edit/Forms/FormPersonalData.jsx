import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const FormPersonalData = ({ values, onChange, onSubmit, isLoading }) => (
  <form className="space-y-4" onSubmit={onSubmit}>
    <div>
      <Label htmlFor="nomeCompleto">Nome Completo</Label>
      <Input
        id="nomeCompleto"
        name="nomeCompleto"
        value={values.nomeCompleto}
        onChange={onChange}
        required
      />
    </div>
    <div>
      <Label htmlFor="documento">CPF/CNPJ</Label>
      <Input
        id="documento"
        name="documento"
        value={values.documento}
        onChange={onChange}
        required
      />
    </div>
    <div>
      <Label htmlFor="fotoDePerfil">Foto de Perfil</Label>
      <Input
        id="fotoDePerfil"
        name="fotoDePerfil"
        type="file"
        accept="image/*"
        onChange={onChange}
      />
    </div>
    <Button type="submit" className="w-full" disabled={isLoading}>
      Salvar Dados
    </Button>
  </form>
);

export default FormPersonalData;