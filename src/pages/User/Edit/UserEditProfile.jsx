// src/pages/User/Edit/UserEditProfile.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../../../contexts/UserContext";
import EditSidebar from "./EditSidebar";
import EditStepPersonal from "./Steps/EditStepPersonal";
import EditStepAddress from "./Steps/EditStepAddress";
import EditStepSecurity from "./Steps/EditStepSecurity";
import DeleteAccountModal from "./DeleteAccountModal"; // Importe o novo modal
import { Alert } from "../../../components/Alert";

import {
  maskPhoneLandline,
  maskCPF,
  maskPhoneMobile,
  maskNome,
} from "../../../utils/masks";
import { validateStep } from "../../../utils/validate-step";

export default function UserEditProfile() {
  const { user, updateUser, logoutUser } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [stepsCompletion, setStepsCompletion] = useState(Array(3).fill(false));
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Novo estado para controlar o modal

  const [personalData, setPersonalData] = useState({
    nomeCompleto: user?.nomeCompleto || "",
    documento: user?.documento || "",
    email: user?.email || "",
    telefone: user?.telefone || "",
    telefoneFixo: user?.telefoneFixo || "",
    fotoDePerfil: user?.fotoDePerfil
      ? import.meta.env.VITE_API_SERVER_URL + user.fotoDePerfil
      : null,
    newFotoDePerfilFile: null,
  });

  const [addressData, setAddressData] = useState({
    cep: user?.cep || "",
    rua: user?.rua || "",
    numero: user?.numero || "",
    complemento: user?.complemento || "",
    bairro: user?.bairro || "",
    cidade: user?.cidade || "",
    estado: user?.estado || "",
  });

  const [securityData, setSecurityData] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  });

  useEffect(() => {
    if (user) {
      setPersonalData({
        nomeCompleto: user.nomeCompleto || "",
        documento: user.documento || "",
        email: user.email || "",
        telefone: user.telefone || "",
        telefoneFixo: user.telefoneFixo || "",
        fotoDePerfil: user.fotoDePerfil
          ? import.meta.env.VITE_API_SERVER_URL + user.fotoDePerfil
          : null,
        newFotoDePerfilFile: null,
      });
      setAddressData({
        cep: user.cep || "",
        rua: user.rua || "",
        numero: user.numero || "",
        complemento: user.complemento || "",
        bairro: user.bairro || "",
        cidade: user.cidade || "",
        estado: user.estado || "",
      });
      setSecurityData({
        senhaAtual: "",
        novaSenha: "",
        confirmarSenha: "",
      });

      const initialCompletion = [
        !!user.nomeCompleto && !!user.email && !!user.telefone,
        !!user.cep && !!user.rua && !!user.cidade,
        false,
      ];
      setStepsCompletion(initialCompletion);
    }
  }, [user]);

  const handlePersonalDataChange = (e) => {
    const { name, value, type, files } = e.target;
    let newValue = value;

    if (name === "documento") newValue = maskCPF(value);
    if (name === "nomeCompleto") newValue = maskNome(value);
    if (name === "telefone") newValue = maskPhoneMobile(value);
    if (name === "telefoneFixo") newValue = maskPhoneLandline(value);

    if (type === "file") {
      setPersonalData((prev) => ({
        ...prev,
        fotoDePerfil: files[0] ? URL.createObjectURL(files[0]) : null,
        newFotoDePerfilFile: files[0] || null,
      }));
    } else {
      setPersonalData((prev) => ({ ...prev, [name]: newValue }));
    }
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSecurityDataChange = (e) => {
    const { name, value } = e.target;
    setSecurityData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handlePersonalSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert(null);
    setErrors({});

    const fieldsToValidate = [
      { name: "nomeCompleto", label: "Nome Completo", required: true },
      { name: "email", label: "Email", required: true, type: "email" },
      { name: "telefone", label: "Celular", required: true },
    ];

    const validationErrors = validateStep(personalData, fieldsToValidate);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setAlert({
        type: "danger",
        message: "Por favor, corrija os campos destacados.",
      });
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    if (user?.usuarioId) {
      formData.append("Usuario_ID", user.usuarioId);
    }
    if (user?.guid) {
      formData.append("GUID", user.guid);
    }

    formData.append("NomeCompleto", personalData.nomeCompleto);
    formData.append("Documento", personalData.documento.replace(/\D/g, ""));
    formData.append("Email", personalData.email);
    formData.append("Telefone", personalData.telefone.replace(/\D/g, ""));
    if (personalData.telefoneFixo) {
      formData.append(
        "TelefoneFixo",
        personalData.telefoneFixo.replace(/\D/g, "")
      );
    }

    if (personalData.newFotoDePerfilFile) {
      formData.append("FotoDePerfil", personalData.newFotoDePerfilFile);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/usuario/AtualizarDadosPessoais`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setAlert({
          type: "success",
          message:
            response.data.message || "Dados pessoais atualizados com sucesso!",
        });
        if (updateUser && response.data.user) {
          updateUser(response.data.user);
          setPersonalData((prev) => ({
            ...prev,
            fotoDePerfil: response.data.user.fotoDePerfil
              ? import.meta.env.VITE_API_SERVER_URL +
                response.data.user.fotoDePerfil
              : null,
            newFotoDePerfilFile: null,
          }));
        }
        setStepsCompletion((prev) => {
          const newCompletion = [...prev];
          newCompletion[0] = true;
          return newCompletion;
        });
        setCurrentStep(1);
      } else {
        setAlert({
          type: "danger",
          message: response.data.message || "Erro ao atualizar dados pessoais.",
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar dados pessoais:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Erro de servidor ao atualizar dados pessoais. Tente novamente.";
      setAlert({ type: "danger", message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddressSubmit = async (data) => {
    setIsLoading(true);
    setAlert(null);

    const formData = new FormData();

    formData.append("CEP", data.cep.replace(/\D/g, ""));
    formData.append("Rua", data.rua);
    formData.append(
      "Numero",
      data.numero !== undefined && data.numero !== null ? String(data.numero) : "0"
    );
    formData.append("Complemento", data.complemento || "");
    formData.append("Bairro", data.bairro);
    formData.append("Cidade", data.cidade);
    formData.append("Estado", data.estado);

    if (user?.usuarioId) {
      formData.append("Usuario_ID", user.usuarioId);
    }
    if (user?.guid) {
      formData.append("GUID", user.guid);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/usuario/AtualizarEndereco`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setAlert({
          type: "success",
          message: response.data.message || "Endereço atualizado com sucesso!",
        });
        if (updateUser && response.data.user) {
          updateUser(response.data.user);
          setAddressData(response.data.user);
        }
        setStepsCompletion((prev) => {
          const newCompletion = [...prev];
          newCompletion[1] = true;
          return newCompletion;
        });
        setCurrentStep(2);
      } else {
        setAlert({
          type: "danger",
          message: response.data.message || "Erro ao atualizar endereço.",
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar endereço:", error);
      if (error.response && error.response.data) {
        console.error("Detalhes do erro do backend:", error.response.data);
        if (error.response.data.errors) {
          let errorMessage = "Erros de validação:\n";
          for (const key in error.response.data.errors) {
            if (Object.hasOwnProperty.call(error.response.data.errors, key)) {
              const fieldName = key.replace(/([A-Z])/g, ' $1').trim();
              errorMessage += `- ${fieldName}: ${error.response.data.errors[key].join(", ")}\n`;
            }
          }
          setAlert({ type: "danger", message: errorMessage });
        } else {
          const errorMessage =
            error.response.data.message || "Erro da API ao atualizar endereço.";
          setAlert({ type: "danger", message: errorMessage });
        }
      } else {
        const errorMessage =
          error.message || "Erro de servidor ao atualizar endereço. Tente novamente.";
        setAlert({ type: "danger", message: errorMessage });
      }
    } finally {
      setIsLoading(false);
    }
  };


  const handleSecuritySubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert(null);
    setErrors({});

    const validationErrors = {};
    if (!securityData.senhaAtual) {
      validationErrors.senhaAtual = "Senha atual é obrigatória.";
    }
    if (!securityData.novaSenha) {
      validationErrors.novaSenha = "Nova senha é obrigatória.";
    } else if (securityData.novaSenha.length < 6) {
      validationErrors.novaSenha =
        "A nova senha deve ter no mínimo 6 caracteres.";
    }
    if (securityData.novaSenha !== securityData.confirmarSenha) {
      validationErrors.confirmarSenha = "As novas senhas não coincidem.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setAlert({
        type: "danger",
        message: "Por favor, corrija os erros na senha.",
      });
      setIsLoading(false);
      return;
    }

    // Preparar FormData para a primeira chamada (VerificarSenha)
    const formDataVerify = new FormData();
    formDataVerify.append("Usuario_ID", user?.usuarioId);
    formDataVerify.append("GUID", user?.guid);
    formDataVerify.append("SenhaAtual", securityData.senhaAtual);

    try {
      // 1. Chamar a API de Verificação de Senha
      const verifyResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/usuario/VerificarSenha`,
        formDataVerify,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!verifyResponse.data.success) {
        setAlert({
          type: "danger",
          message: verifyResponse.data.message || "Senha atual inválida.",
        });
        setIsLoading(false);
        return;
      }

      // Se a verificação foi bem-sucedida, proceed para AtualizarSenha
      // Preparar FormData para a segunda chamada (AtualizarSenha)
      const formDataUpdate = new FormData();
      formDataUpdate.append("Usuario_ID", user?.usuarioId);
      formDataUpdate.append("GUID", user?.guid);
      formDataUpdate.append("SenhaAtual", securityData.senhaAtual);
      formDataUpdate.append("NovaSenha", securityData.novaSenha);
      formDataUpdate.append("ConfirmarSenha", securityData.confirmarSenha);

      const updateResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/usuario/AtualizarSenha`,
        formDataUpdate,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (updateResponse.data.success) {
        setAlert({
          type: "success",
          message: updateResponse.data.message || "Senha atualizada com sucesso!",
        });
        setSecurityData({ senhaAtual: "", novaSenha: "", confirmarSenha: "" });
        setStepsCompletion((prev) => {
          const newCompletion = [...prev];
          newCompletion[2] = true;
          return newCompletion;
        });
      } else {
        setAlert({
          type: "danger",
          message: updateResponse.data.message || "Erro ao atualizar senha.",
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar senha:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Erro de servidor ao atualizar senha. Tente novamente.";
      setAlert({ type: "danger", message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  // Alteramos handleAccountDeleted para apenas abrir o modal
  const handleDeleteAccountClick = () => {
    setIsDeleteModalOpen(true);
  };

  // Esta função será chamada pelo modal quando a conta for realmente excluída
  const handleAccountSuccessfullyDeleted = () => {
    if (logoutUser) {
      logoutUser(); // Desloga o usuário após a exclusão
    }
    // Redireciona ou mostra uma mensagem, etc.
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <EditStepPersonal
            values={personalData}
            onChange={handlePersonalDataChange}
            onSubmit={handlePersonalSubmit}
            isLoading={isLoading}
            errors={errors}
          />
        );
      case 1:
        return (
          <EditStepAddress
            values={addressData}
            onSubmit={handleAddressSubmit}
            isLoading={isLoading}
            onPrev={() => setCurrentStep(0)}
          />
        );
      case 2:
        return (
          <EditStepSecurity
            values={securityData}
            onChange={handleSecurityDataChange}
            onSubmit={handleSecuritySubmit}
            isLoading={isLoading}
            onPrev={() => setCurrentStep(1)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-primary-dark to-customGray-900">
      {alert && (
        <Alert
          type={alert.type}
          onClose={() => setAlert(null)}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        >
          {alert.message}
        </Alert>
      )}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 px-4">
        <div className="w-full md:w-80 md:h-fit md:sticky md:top-8">
          <EditSidebar
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            onDeleteAccount={handleDeleteAccountClick} // Passa a nova função para abrir o modal
            stepsCompletion={stepsCompletion}
          />
        </div>
        <main
          className="
            flex-1
            min-h-[80vh]
            bg-white
            rounded-2xl
            shadow-2xl
            p-6
            md:p-10
            flex
            flex-col
            justify-center
            items-center
            transition-all
            duration-300
          "
        >
          {renderStep()}
        </main>
      </div>

      {/* O Novo Modal de Exclusão de Conta */}
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        userGuid={user?.guid} // Passa o GUID do usuário para o modal
        onAccountDeleted={handleAccountSuccessfullyDeleted} // Passa o callback para deslogar
        onShowAlert={setAlert} // Passa a função para mostrar alertas
      />
    </div>
  );
}