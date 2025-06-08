import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const FormAddressData = ({ values, onChange, onSubmit, isLoading }) => (
  <form className="space-y-4" onSubmit={onSubmit}>
    <div>
      <Label htmlFor="cep">CEP</Label>
      <Input
        id="cep"
        name="cep"
        value={values.cep}
        onChange={onChange}
        required
      />
    </div>
    <div>
      <Label htmlFor="endereco">Endereço Completo</Label>
      <Input
        id="endereco"
        name="endereco"
        value={values.endereco}
        onChange={onChange}
        required
      />
    </div>
    <div>
      <Label htmlFor="complemento">Complemento</Label>
      <Input
        id="complemento"
        name="complemento"
        value={values.complemento}
        onChange={onChange}
      />
    </div>
    <Button type="submit" className="w-full" disabled={isLoading}>
      Salvar Endereço
    </Button>
  </form>
);

export default FormAddressData;