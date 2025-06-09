// src/pages/User/Edit/Steps/EditStepPersonal.jsx
import React, { useRef } from "react";
import { User, FileText, Phone, Mail, Image as ImageIcon, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button"; // Verifique este caminho
import FormField from "../../../../components/FormField"; // Verifique este caminho
import { Label } from "@radix-ui/react-label"; // Verifique se está usando @radix-ui/react-label

export default function EditStepPersonal({ values, onChange, onSubmit, isLoading, errors }) {
  const fileInputRef = useRef(null);

  // Lógica para fotoPreview:
  // 1. Se `newFotoDePerfilFile` for um objeto File (novo upload), cria URL temporária.
  // 2. Senão, se `fotoDePerfil` for uma string (URL existente), usa diretamente.
  // 3. Caso contrário, é nulo (nenhuma foto para preview).
  const fotoPreview =
    values.newFotoDePerfilFile instanceof File
      ? URL.createObjectURL(values.newFotoDePerfilFile)
      : typeof values.fotoDePerfil === "string"
      ? values.fotoDePerfil
      : null;

  return (
    <form className="space-y-7 max-w-lg mx-auto" onSubmit={onSubmit} autoComplete="off">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg border-4 border-white">
          {fotoPreview ? (
            <img
              src={fotoPreview}
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <ImageIcon className="w-8 h-8 text-white opacity-80" />
          )}
        </div>
        <div>
          <h2 className="font-heading text-xl text-primary-dark font-bold">
            Alterar Dados Pessoais
          </h2>
          <p className="text-customGray-600 text-sm">
            Atualize suas informações básicas.
          </p>
        </div>
      </div>

      <FormField
        id="nomeCompleto"
        name="nomeCompleto"
        type="text"
        label="Nome Completo"
        placeholder="Seu nome completo"
        value={values.nomeCompleto}
        onChange={onChange}
        error={errors?.nomeCompleto}
        required
        icon={<User className="text-primary" />}
      />

      <FormField
        id="documento"
        name="documento"
        type="text"
        label="CPF/CNPJ"
        placeholder="XXX.XXX.XXX-XX"
        value={values.documento}
        onChange={onChange}
        error={errors?.documento}
        required
        readOnly // Mantido como readOnly conforme sua intenção
        icon={<FileText className="text-secondary" />}
        extraRight={
          <span className="text-customGray-400 text-xs select-none ml-2">
            Não editável
          </span>
        }
      />

      <FormField
        id="email"
        name="email"
        type="email"
        label="Email"
        placeholder="seuemail@exemplo.com"
        value={values.email}
        onChange={onChange}
        error={errors?.email}
        required
        icon={<Mail className="text-accent" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="telefone"
          name="telefone"
          type="tel"
          label="Celular"
          placeholder="(XX) XXXXX-XXXX"
          value={values.telefone}
          onChange={onChange}
          error={errors?.telefone}
          required
          icon={<Phone className="text-primary" />}
        />
        <FormField
          id="telefoneFixo"
          name="telefoneFixo"
          type="tel"
          label="Telefone Fixo (Opcional)"
          placeholder="(XX) XXXX-XXXX"
          value={values.telefoneFixo}
          onChange={onChange}
          error={errors?.telefoneFixo}
          required={false}
          icon={<Phone className="text-secondary" />}
        />
      </div>

      {/* Upload de Foto de Perfil */}
      <div>
        <Label
          htmlFor="newFotoDePerfilFile" // O ID do input de arquivo é 'newFotoDePerfilFile'
          className="text-customGray-700 font-semibold mb-2 block"
        >
          Foto de Perfil (Opcional)
        </Label>
        <div
          className="flex flex-col items-center justify-center rounded-md p-6 bg-customGray-100 hover:bg-customGray-200 cursor-pointer transition-colors duration-200 relative border border-customGray-300"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          <input
            id="newFotoDePerfilFile" // Usar este ID no input de arquivo
            ref={fileInputRef}
            type="file"
            name="newFotoDePerfilFile" // Nome do campo que será usado no `onChange` para atualizar `newFotoDePerfilFile`
            accept="image/*"
            onChange={onChange}
            className="hidden"
          />
          {fotoPreview ? (
            <img
              src={fotoPreview}
              alt="Pré-visualização"
              className="w-24 h-24 rounded-full object-cover mb-2 border-2 border-primary"
            />
          ) : (
            <UploadCloud size={48} className="text-customGray-500 mb-2" />
          )}
          <p className="text-customGray-600 text-sm text-center">
            {fotoPreview
              ? "Mudar foto"
              : "Arraste e solte uma imagem ou clique para selecionar"}
          </p>
          <Button
            type="button"
            className="mt-2 bg-secondary text-white hover:bg-secondary-dark text-sm"
            onClick={e => {
              e.stopPropagation(); // Evita que o clique no botão ative o div pai
              fileInputRef.current && fileInputRef.current.click();
            }}
          >
            {fotoPreview ? "Trocar Imagem" : "Escolher Imagem"}
          </Button>
        </div>
        {errors?.newFotoDePerfilFile && <p className="text-red-500 text-sm mt-1">{errors.newFotoDePerfilFile}</p>}
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-3 rounded-xl shadow-lg hover:from-secondary hover:to-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? "Salvando..." : "Salvar"}
      </Button>
    </form>
  );
}