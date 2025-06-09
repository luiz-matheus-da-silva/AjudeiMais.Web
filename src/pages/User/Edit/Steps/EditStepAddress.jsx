// src/pages/User/Edit/Steps/EditStepAddress.jsx
import React, { useEffect } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormField from "../../../../components/FormField";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { maskCEP } from "../../../../utils/masks";
import { searchCEPUpdate } from "../../../../utils/search-cep-update";

// --- 1. Definição do Esquema de Validação com Zod ---
const addressFormSchema = z.object({
  cep: z
    .string()
    .min(1, "CEP é obrigatório.")
    .regex(/^\d{5}-\d{3}$/, "Formato de CEP inválido (XXXXX-XXX)."),
  rua: z.string().min(1, "Rua é obrigatória."),
  numero: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().min(1, "Número é obrigatório.").int("Número deve ser um inteiro.")
  ),
  complemento: z.string().optional(),
  bairro: z.string().min(1, "Bairro é obrigatório."),
  cidade: z.string().min(1, "Cidade é obrigatória."),
  estado: z.string().min(1, "Estado é obrigatório."),
});

export default function EditStepAddress({ values, onSubmit, onPrev, isLoading }) {
  const {
    control, 
    handleSubmit,
    setValue, 
    watch,
    formState: { errors },
    setError,   // Importe setError para feedback de erro do CEP
    clearErrors // Importe clearErrors para limpar erros do CEP
  } = useForm({
    resolver: zodResolver(addressFormSchema), 
    defaultValues: { 
      cep: values.cep || "",
      rua: values.rua || "",
      numero: values.numero || "",
      complemento: values.complemento || "",
      bairro: values.bairro || "",
      cidade: values.cidade || "",
      estado: values.estado || "",
    },
  });

  const watchedCep = watch("cep");

  // Effect para pré-preencher os campos com os valores iniciais do usuário
  // Isso garante que o formulário seja inicializado com os dados existentes
  useEffect(() => {
    setValue("cep", values.cep || "");
    setValue("rua", values.rua || "");
    setValue("numero", values.numero || "");
    setValue("complemento", values.complemento || "");
    setValue("bairro", values.bairro || "");
    setValue("cidade", values.cidade || "");
    setValue("estado", values.estado || "");
  }, [values, setValue]);

  useEffect(() => {
    const fetchAddressByCep = async () => {
      const cleanedCep = watchedCep ? watchedCep.replace(/\D/g, "") : "";
      
      // Limpa erros do CEP e campos de endereço se o CEP não tem 8 dígitos ou está vazio
      if (cleanedCep.length === 0) {
        clearErrors("cep");
        setValue("rua", "");
        setValue("bairro", "");
        setValue("cidade", "");
        setValue("estado", "");
        setValue("numero", "");     // Limpa o número
        setValue("complemento", ""); // Limpa o complemento
        return; // Sai da função se o CEP estiver vazio
      }

      if (cleanedCep.length === 8) {
        clearErrors("cep"); // Limpa qualquer erro de validação anterior para o CEP
        try {
          const address = await searchCEPUpdate(cleanedCep);
          if (address && !address.erro) { 
            // Preenche os campos que vêm da API
            setValue("rua", address.logradouro || "");
            setValue("bairro", address.bairro || "");
            setValue("cidade", address.localidade || "");
            setValue("estado", address.uf || "");
            // IMPORTANTE: NÃO LIMPE "numero" e "complemento" AQUI!
            // Eles são campos para o usuário preencher.
            
          } else {
            // Se o CEP não for encontrado ou for inválido, limpe todos os campos de endereço
            setValue("rua", "");
            setValue("bairro", "");
            setValue("cidade", "");
            setValue("estado", "");
            setValue("numero", ""); // Limpa o número
            setValue("complemento", ""); // Limpa o complemento
            // Define um erro específico para o campo CEP
            setError("cep", {
              type: "manual",
              message: address?.message || "CEP não encontrado. Verifique e digite novamente.",
            });
          }
        } catch (error) {
          console.error("Erro ao buscar CEP:", error);
          // Em caso de erro na requisição (rede, servidor, etc.), limpe e mostre erro
          setValue("rua", "");
          setValue("bairro", "");
          setValue("cidade", "");
          setValue("estado", "");
          setValue("numero", "");
          setValue("complemento", "");
          setError("cep", {
            type: "manual",
            message: "Erro na conexão. Não foi possível buscar o CEP.",
          });
        }
      } else {
        // Se o CEP tem conteúdo mas não 8 dígitos (ainda digitando)
        // Você pode optar por limpar apenas os campos preenchidos automaticamente ou deixar como está.
        // Por agora, vamos garantir que não há erro de busca ainda.
        clearErrors("cep");
      }
    };

    fetchAddressByCep();
  }, [watchedCep, setValue, setError, clearErrors]); // Adicione setError e clearErrors às dependências

  // --- Função de Submissão ---
  const handleFormSubmit = (data) => {
    // A propriedade 'cep' já é tratada para remover a máscara no 'UserEditProfile.jsx'
    // Mas é uma boa prática garantir aqui também.
    const dataToSend = {
      ...data,
      cep: data.cep.replace(/\D/g, ""), 
    };
    onSubmit(dataToSend); 
  };

  return (
    <form className="space-y-7 h-full flex flex-col justify-center" onSubmit={handleSubmit(handleFormSubmit)} autoComplete="off">
      <div className="flex items-center gap-3 mb-4">
        <MapPin className="w-8 h-8 text-secondary" />
        <h2 className="font-heading text-xl text-primary-dark font-bold">
          Alterar Endereço
        </h2>
      </div>

      {/* Campo CEP */}
      <Controller
        name="cep"
        control={control}
        render={({ field: { onChange, value, ...restField } }) => (
          <FormField
            id="cep"
            name="CEP"
            type="text"
            label="CEP"
            placeholder="Somente números: XXXXX-XXX"
            value={maskCEP(value)}
            onChange={(e) => onChange(maskCEP(e.target.value))}
            maxLength={9}
            error={errors.cep?.message}
            required
            {...restField}
          />
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Campo Rua */}
        <Controller
          name="rua"
          control={control}
          render={({ field }) => (
            <FormField
              id="rua"
              name="Rua"
              type="text"
              label="Rua"
              placeholder="Nome da Rua/Avenida"
              readOnly
              error={errors.rua?.message}
              required
              {...field}
            />
          )}
        />
        {/* Campo Número */}
        <Controller
          name="numero"
          control={control}
          render={({ field }) => (
            <FormField
              id="numero"
              name="Numero"
              type="number" // Mantido como type="number"
              label="Número"
              placeholder="Ex: 123"
              error={errors.numero?.message}
              required
              {...field}
            />
          )}
        />
      </div>

      {/* Campo Complemento */}
      <Controller
        name="complemento"
        control={control}
        render={({ field }) => (
          <FormField
            id="complemento"
            name="Complemento"
            type="text"
            label="Complemento (Opcional)"
            placeholder="Ex: Apt 101, Bloco B"
            error={errors.complemento?.message}
            required={false}
            {...field}
          />
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Campo Bairro */}
        <Controller
          name="bairro"
          control={control}
          render={({ field }) => (
            <FormField
              id="bairro"
              name="Bairro"
              type="text"
              label="Bairro"
              placeholder="Ex: Centro"
              readOnly
              error={errors.bairro?.message}
              required
              {...field}
            />
          )}
        />
        {/* Campo Cidade */}
        <Controller
          name="cidade"
          control={control}
          render={({ field }) => (
            <FormField
              id="cidade"
              name="Cidade"
              type="text"
              label="Cidade"
              placeholder="Ex: Londrina"
              readOnly
              error={errors.cidade?.message}
              required
              {...field}
            />
          )}
        />
      </div>

      {/* Campo Estado */}
      <Controller
        name="estado"
        control={control}
        render={({ field }) => (
          <FormField
            id="estado"
            name="Estado"
            type="text"
            label="Estado"
            placeholder="Ex: PR"
            readOnly
            error={errors.estado?.message}
            required
            {...field}
          />
        )}
      />

      <div className="flex justify-between gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          disabled={isLoading}
        >
          Voltar
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 rounded-xl shadow-lg hover:from-secondary hover:to-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Salvando..." : "Salvar e Avançar"}
        </Button>
      </div>
    </form>
  );
}