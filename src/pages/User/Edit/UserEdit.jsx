import React, { useState } from "react";
import EditSidebar from "./EditSidebar";
import FormPersonalData from "./FormPersonalData";
import FormContactData from "./FormContactData";
import FormAddressData from "./FormAddressData";
import FormSecurityData from "./FormSecurityData";

const UserEditProfile = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // Estados para cada etapa (ajuste conforme seu backend)
  const [personalData, setPersonalData] = useState({ nomeCompleto: "", documento: "", fotoDePerfil: "" });
  const [contactData, setContactData] = useState({ email: "", telefone: "", celular: "" });
  const [addressData, setAddressData] = useState({ cep: "", endereco: "", complemento: "" });
  const [securityData, setSecurityData] = useState({ senhaAtual: "", novaSenha: "", confirmarSenha: "" });

  // Funções de submit para cada etapa (implemente a lógica de update conforme sua API)
  const handlePersonalSubmit = (e) => { e.preventDefault(); /* update API */ };
  const handleContactSubmit = (e) => { e.preventDefault(); /* update API */ };
  const handleAddressSubmit = (e) => { e.preventDefault(); /* update API */ };
  const handleSecuritySubmit = (e) => { e.preventDefault(); /* update API */ };

  // Renderiza o formulário conforme o passo
  const renderStepForm = () => {
    switch (currentStep) {
      case 0:
        return (
          <FormPersonalData
            values={personalData}
            onChange={e => setPersonalData({ ...personalData, [e.target.name]: e.target.value })}
            onSubmit={handlePersonalSubmit}
          />
        );
      case 1:
        return (
          <FormContactData
            values={contactData}
            onChange={e => setContactData({ ...contactData, [e.target.name]: e.target.value })}
            onSubmit={handleContactSubmit}
          />
        );
      case 2:
        return (
          <FormAddressData
            values={addressData}
            onChange={e => setAddressData({ ...addressData, [e.target.name]: e.target.value })}
            onSubmit={handleAddressSubmit}
          />
        );
      case 3:
        return (
          <FormSecurityData
            values={securityData}
            onChange={e => setSecurityData({ ...securityData, [e.target.name]: e.target.value })}
            onSubmit={handleSecuritySubmit}
          />
        );
      default:
        return null;
    }
  };

  // Função para exclusão de conta
  const handleDeleteAccount = () => {
    // Chame sua API de exclusão aqui
    alert("Conta excluída!");
  };

  return (
    <div className="flex gap-8 max-w-5xl mx-auto py-10">
      <EditSidebar
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        onDeleteAccount={handleDeleteAccount}
      />
      <div className="flex-1 bg-white rounded-2xl shadow-xl p-8">
        {renderStepForm()}
      </div>
    </div>
  );
};

export default UserEditProfile;