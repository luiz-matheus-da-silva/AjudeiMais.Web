import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const FormContactData = ({ values, onChange, onSubmit, isLoading }) => (
  <form className="space-y-4" onSubmit={onSubmit}>
    <div>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        value={values.email}
        onChange={onChange}
        required
      />
    </div>
    <div>
      <Label htmlFor="telefoneFixo">Telefone Fixo</Label>
      <Input
        id="telefoneFixo"
        name="telefoneFixo"
        value={values.telefoneFixo}
        onChange={onChange}
      />
    </div>
    <div>
      <Label htmlFor="celular">Celular</Label>
      <Input
        id="celular"
        name="celular"
        value={values.celular}
        onChange={onChange}
        required
      />
    </div>
    <Button type="submit" className="w-full" disabled={isLoading}>
      Salvar Contato
    </Button>
  </form>
);

export default FormContactData;