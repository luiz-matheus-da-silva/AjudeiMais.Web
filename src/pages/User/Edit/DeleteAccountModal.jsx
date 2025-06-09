import React, { useState } from "react";
import axios from "axios";
// Certifique-se de que estes imports são do Shadcn UI e estão funcionando corretamente
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FormField from "../../../components/FormField"; // Verifique o caminho correto para seu FormField
import { Loader2 } from "lucide-react"; // Apenas Loader2, removemos Trash2
import Lottie from "react-lottie";
import deleteAnimation from "../../../animations/delete-animation.json"; // Caminho para sua animação Lottie

export default function DeleteAccountModal({
  isOpen,
  onClose,
  userGuid,
  onAccountDeleted,
  onShowAlert,
}) {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: deleteAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleDelete = async () => {
    setErrors({});
    onShowAlert(null); // Limpa qualquer alerta anterior

    if (!senhaAtual) {
      setErrors({ senhaAtual: "A senha atual é obrigatória para excluir a conta." });
      return;
    }

    if (!userGuid) {
      onShowAlert({ type: "danger", message: "GUID do usuário não encontrado. Não é possível excluir a conta." });
      onClose();
      return;
    }

    setIsLoading(true);

    try {
      // 1. Verificar a senha atual
      const verifyResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/usuario/VerificarSenha`,
        {
          GUID: userGuid,
          SenhaAtual: senhaAtual,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!verifyResponse.data.success) {
        setErrors({ senhaAtual: verifyResponse.data.message || "Senha atual inválida." });
        onShowAlert({ type: "danger", message: verifyResponse.data.message || "Senha atual inválida." });
        setIsLoading(false);
        return;
      }

      // Se a senha foi verificada, proceed para a exclusão
      const deleteResponse = await axios.delete(
        `${import.meta.env.VITE_API_URL}/usuario/ExcluirConta`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          data: {
            GUID: userGuid,
            SenhaAtual: senhaAtual,
          },
        }
      );

      if (deleteResponse.data.success) {
        onShowAlert({ type: "success", message: deleteResponse.data.message || "Sua conta foi excluída com sucesso." });
        onAccountDeleted(); // Chama o callback para deslogar
        onClose();
      } else {
        onShowAlert({ type: "danger", message: deleteResponse.data.message || "Erro ao excluir conta." });
      }
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
      const errorMessage =
        error.response?.data?.message || "Erro de servidor ao excluir conta. Tente novamente.";
      onShowAlert({ type: "danger", message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // O componente Dialog do Shadcn UI já deve ter um overlay com fundo.
    // Se o problema persistir, verifique a configuração do seu `global.css` ou `tailwind.config.js`
    // para as cores de fundo padrão dos overlays de modais.
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/*
        A classe `className="sm:max-w-[425px] p-6"` já define as dimensões e padding.
        A cor de fundo do `DialogContent` é geralmente definida pelas classes padrão do Shadcn UI.
        Se ainda estiver transparente, pode ser que o Tailwind CSS padrão de `DialogContent`
        esteja sendo sobrescrito ou que as variáveis de cor não estejam definidas.
        Você pode forçar um fundo branco ou cinza se necessário: `bg-white` ou `bg-gray-100`.
      */}
      <DialogContent className="sm:max-w-[425px] p-6 bg-white">
        <DialogHeader className="text-center flex flex-col items-center">
          {/* Apenas o Lottie animation */}
          <Lottie options={defaultOptions} height={120} width={120} /> {/* Aumentei um pouco o tamanho */}
          {/* Removido: <Trash2 className="h-12 w-12 text-red-500 animate-bounce" /> */}
          <DialogTitle className="text-2xl font-bold text-gray-800 mt-4">
            Excluir Conta Permanentemente?
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 text-center text-gray-600">
          <p className="mb-4">
            Esta ação é **irreversível**. Todos os seus dados serão apagados.
            Para confirmar a exclusão da sua conta, por favor, digite sua senha atual:
          </p>
          <FormField
            label="Senha Atual"
            id="modalSenhaAtual"
            name="senhaAtual"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={senhaAtual}
            onChange={(e) => {
              setSenhaAtual(e.target.value);
              setErrors((prev) => ({ ...prev, senhaAtual: undefined }));
            }}
            isPassword
            showToggle
            toggleFunction={() => setShowPassword((prev) => !prev)}
            error={errors.senhaAtual}
            required
          />
        </div>
        <DialogFooter className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Excluindo..." : "Confirmar Exclusão"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}