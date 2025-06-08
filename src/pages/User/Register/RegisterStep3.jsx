// src/components/auth/RegisterStep3.jsx
import React from "react";
import { Checkbox, Indicator } from "@radix-ui/react-checkbox";
import { Label } from "@radix-ui/react-label"; // Mantenha o import original do Label para o Checkbox
import { CheckCircle, UploadCloud, XCircle } from "lucide-react"; // Importe XCircle
import { Button } from "@/components/ui/button"; // Certifique-se de que o caminho para o Button está correto
import FormField from "../../../components/FormField";

export default function RegisterStep3({
  form,
  handleChange,
  previewFoto,
  errors,
  handleTermsChange,
  showPassword,
  togglePasswordVisibility,
  toggleConfirmPasswordVisibility,
  showConfirmPassword,
}) {
  return (
    <>
      <h3 className="text-3xl font-heading text-primary-dark text-center mb-6 flex items-center justify-center gap-2">
        <CheckCircle size={24} className="text-accent" /> Quase lá!
      </h3>
      <FormField
        id="Senha"
        name="Senha"
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        value={form.Senha}
        onChange={handleChange}
        error={errors.Senha}
        isPassword={true}
        showToggle={true}
        toggleFunction={togglePasswordVisibility}
      />

      <FormField
        id="ConfirmarSenha"
        name="ConfirmarSenha"
        type={showConfirmPassword ? "text" : "password"}
        placeholder="••••••••"
        value={form.ConfirmarSenha}
        onChange={handleChange}
        error={errors.ConfirmarSenha}
        isPassword={true}
        showToggle={true}
        toggleFunction={toggleConfirmPasswordVisibility}
      />

      <div className="space-y-5">
        {" "}
        {/* Aumentei o espaço para melhor visualização */}
        {/* Campo Foto de Perfil */}
        <div>
          <Label
            htmlFor="FotoDePerfil"
            className="text-customGray-700 font-semibold mb-2 block"
          >
            Foto de Perfil (Opcional)
          </Label>
          <div
            className={`flex flex-col items-center justify-center rounded-md p-6 bg-customGray-100 hover:bg-customGray-200 cursor-pointer transition-colors duration-200 relative
              ${
                errors.FotoDePerfil
                  ? "border-2 border-danger"
                  : "border border-customGray-300"
              }
            `}
            // Permite clicar em qualquer lugar para ativar o input de arquivo
            onClick={() => document.getElementById("FotoDePerfil").click()}
          >
            <input // Usamos input HTML nativo para 'file' e o escondemos
              id="FotoDePerfil"
              type="file"
              name="FotoDePerfil"
              accept="image/*"
              onChange={handleChange}
              className="hidden" // Esconde o input padrão
              aria-invalid={errors.FotoDePerfil ? "true" : "false"}
              aria-describedby={
                errors.FotoDePerfil ? "FotoDePerfil-error" : undefined
              }
            />
            {previewFoto ? (
              <img
                src={previewFoto}
                alt="Pré-visualização"
                className="w-24 h-24 rounded-full object-cover mb-2 border-2 border-primary"
              />
            ) : (
              <UploadCloud size={48} className="text-customGray-500 mb-2" />
            )}
            <p className="text-customGray-600 text-sm text-center">
              {previewFoto
                ? "Mudar foto"
                : "Arraste e solte uma imagem ou clique para selecionar"}
            </p>
            {/* O botão agora é mais um adereço visual para clareza, pois o div pai já é clicável */}
            <Button
              type="button"
              className="mt-2 bg-secondary text-white hover:bg-secondary-dark text-sm"
              // Não precisamos do onClick aqui se o div pai já o faz
              // onClick={() => document.getElementById("FotoDePerfil").click()}
            >
              {previewFoto ? "Trocar Imagem" : "Escolher Imagem"}
            </Button>

            {errors.FotoDePerfil && (
              <div className="absolute top-2 right-2 text-danger cursor-help group">
                <XCircle size={20} />
                <span
                  id="FotoDePerfil-error"
                  role="alert"
                  className="absolute hidden group-hover:block -right-2 transform translate-x-full mt-2 w-max max-w-[200px] p-2 bg-danger text-white text-xs rounded-md shadow-lg z-20 whitespace-normal"
                >
                  {errors.FotoDePerfil}
                </span>
              </div>
            )}
          </div>
          {errors.FotoDePerfil && (
            // Mensagem de erro abaixo do campo também, para acessibilidade e clareza
            <p className="text-danger text-sm mt-1">{errors.FotoDePerfil}</p>
          )}
        </div>
        {/* Checkbox de Termos e Condições */}
        <div className="mt-6">
          <div className="flex items-center space-x-2 relative">
            <Checkbox
              id="aceitoTermos"
              name="aceitoTermos"
              checked={form.aceitoTermos}
              onCheckedChange={handleTermsChange}
              className={`w-4 h-4 text-primary rounded focus:ring-primary
                ${
                  errors.aceitoTermos
                    ? "border-2 border-danger"
                    : "border border-customGray-300"
                }
              `}
              aria-invalid={errors.aceitoTermos ? "true" : "false"}
              aria-describedby={
                errors.aceitoTermos ? "aceitoTermos-error" : undefined
              }
            >
              <Indicator>
                <svg
                  className="w-4 h-4 text-primary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Indicator>
            </Checkbox>
            <Label
              htmlFor="aceitoTermos"
              className="text-sm text-customGray-600 cursor-pointer"
            >
              Eu concordo com os{" "}
              <a
                href="/termos-de-uso"
                className="text-secondary hover:underline hover:text-secondary-dark transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Termos de Uso
              </a>{" "}
              e{" "}
              <a
                href="/politica-de-privacidade"
                className="text-secondary hover:underline hover:text-secondary-dark transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de Privacidade
              </a>
              .
            </Label>
            {errors.aceitoTermos && (
              <div className="absolute -top-6 right-0 text-danger cursor-help group">
                {" "}
                {/* Ajustado a posição para aparecer acima do texto */}
                <XCircle size={20} />
                <span
                  id="aceitoTermos-error"
                  role="alert"
                  className="absolute hidden group-hover:block right-0 transform translate-x-full mt-2 w-max max-w-[200px] p-2 bg-danger text-white text-xs rounded-md shadow-lg z-20 whitespace-normal"
                >
                  {errors.aceitoTermos}
                </span>
              </div>
            )}
          </div>
          {errors.aceitoTermos && (
            // Mensagem de erro abaixo do checkbox também, para acessibilidade e clareza
            <p className="text-danger text-sm mt-1">{errors.aceitoTermos}</p>
          )}
        </div>
      </div>
    </>
  );
}
