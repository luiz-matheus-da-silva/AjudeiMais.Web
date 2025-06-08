import React, { useState } from "react";
import {
  User,
  MapPin,
  Mail,
  Lock,
  Image,
  Phone,
  FileText,
  Check,
  AlertCircle,
  Trash2,
  ChevronRight,
  Shield,
  Heart,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    id: "personal",
    label: "Informações Pessoais",
    description: "Seus dados básicos e identificação",
    icon: <User size={20} />,
    color: "from-blue-500 to-blue-600",
    fields: [
      { label: "Nome Completo", icon: <User size={16} />, required: true },
      { label: "CPF/CNPJ", icon: <FileText size={16} />, required: true },
      { label: "Foto de Perfil", icon: <Image size={16} />, required: false },
    ],
    completed: true,
  },
  {
    id: "contact",
    label: "Contato",
    description: "Como podemos nos comunicar com você",
    icon: <Mail size={20} />,
    color: "from-green-500 to-green-600",
    fields: [
      { label: "Email Principal", icon: <Mail size={16} />, required: true },
      { label: "Telefone", icon: <Phone size={16} />, required: false },
      { label: "Celular", icon: <Phone size={16} />, required: true },
    ],
    completed: false,
  },
  {
    id: "address",
    label: "Endereço",
    description: "Onde você está localizado",
    icon: <MapPin size={20} />,
    color: "from-purple-500 to-purple-600",
    fields: [
      { label: "CEP", icon: <MapPin size={16} />, required: true },
      { label: "Endereço Completo", icon: <MapPin size={16} />, required: true },
      { label: "Complemento", icon: <MapPin size={16} />, required: false },
    ],
    completed: false,
  },
  {
    id: "security",
    label: "Segurança",
    description: "Proteja sua conta com uma senha forte",
    icon: <Lock size={20} />,
    color: "from-orange-500 to-orange-600",
    fields: [
      { label: "Senha Atual", icon: <Lock size={16} />, required: true },
      { label: "Nova Senha", icon: <Lock size={16} />, required: true },
      { label: "Confirmar Senha", icon: <Lock size={16} />, required: true },
    ],
    completed: false,
  },
];

const EditSidebar = ({
  currentStep = 0,
  onStepChange,
  onDeleteAccount,
  userType = "doador",
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  const handleStepClick = (index) => {
    onStepChange && onStepChange(index);
  };

  const handleDeleteClick = () => {
    if (showDeleteConfirm) {
      onDeleteAccount && onDeleteAccount();
    } else {
      setShowDeleteConfirm(true);
      // Reset after 5 seconds
      setTimeout(() => setShowDeleteConfirm(false), 5000);
    }
  };

  return (
    <aside className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 w-80 min-h-[600px] flex flex-col gap-6">
      {/* Header com título acolhedor */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
          <Settings className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-heading font-bold text-primary-dark">
            Editar Perfil
          </h2>
          <p className="text-sm text-customGray-600 mt-1">
            Mantenha suas informações sempre atualizadas
          </p>
        </div>
      </div>

      {/* Barra de Progresso */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-customGray-700">
            Progresso do Perfil
          </span>
          <span className="text-sm font-bold text-accent">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="w-full bg-customGray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-accent to-accent-dark h-full rounded-full transition-all duration-700 ease-out shadow-sm"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-xs text-customGray-500">
          {completedSteps} de {steps.length} seções concluídas
        </p>
      </div>

      {/* Navigation Steps */}
      <nav className="flex flex-col gap-3 flex-1">
        {steps.map((step, idx) => {
          const isActive = idx === currentStep;
          const isCompleted = step.completed;
          
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => handleStepClick(idx)}
              className={`group relative p-4 rounded-xl transition-all duration-300 text-left border-2 overflow-hidden
                ${isActive 
                  ? 'border-accent bg-gradient-to-r from-accent/10 to-accent/5 shadow-lg scale-[1.02]' 
                  : isCompleted
                    ? 'border-green-200 bg-green-50/50 hover:bg-green-100/50'
                    : 'border-customGray-200 bg-white/50 hover:bg-customGray-50/50 hover:border-customGray-300'
                }`}
            >
              {/* Background gradient effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative flex items-start gap-4">
                {/* Step Icon/Status */}
                <div className={`flex items-center justify-center rounded-xl w-12 h-12 transition-colors duration-300
                  ${isActive 
                    ? 'bg-accent text-white shadow-lg' 
                    : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-customGray-100 text-customGray-600 group-hover:bg-customGray-200'
                  }`}
                >
                  {isCompleted ? <Check size={20} /> : step.icon}
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold text-base truncate
                      ${isActive ? 'text-accent-dark' : isCompleted ? 'text-green-700' : 'text-customGray-800'}
                    `}>
                      {step.label}
                    </h3>
                    <ChevronRight className={`w-4 h-4 transition-transform duration-200
                      ${isActive ? 'text-accent rotate-90' : 'text-customGray-400 group-hover:translate-x-1'}
                    `} />
                  </div>
                  
                  <p className="text-xs text-customGray-600 mt-1 mb-2 line-clamp-2">
                    {step.description}
                  </p>

                  {/* Fields Preview */}
                  <div className="flex flex-wrap gap-1">
                    {step.fields.map((field, fieldIdx) => (
                      <span
                        key={fieldIdx}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs
                          ${isActive 
                            ? 'bg-accent/10 text-accent-dark' 
                            : isCompleted
                              ? 'bg-green-100 text-green-700'
                              : 'bg-customGray-100 text-customGray-600'
                          }
                        `}
                      >
                        {field.icon}
                        <span className="truncate max-w-20">{field.label}</span>
                        {field.required && (
                          <span className="text-red-500">*</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="border-t border-customGray-200 pt-6 space-y-4">
        {/* Trust Badge */}
        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary-light/10 to-secondary-light/10 rounded-lg border border-primary-light/20">
          <Shield className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm font-medium text-primary-dark">
              Seus dados estão seguros
            </p>
            <p className="text-xs text-customGray-600">
              Criptografia de ponta a ponta
            </p>
          </div>
        </div>

        {/* Delete Account */}
        <Button
          type="button"
          variant="destructive"
          className={`w-full flex items-center gap-2 justify-center py-3 rounded-xl font-semibold transition-all duration-300
            ${showDeleteConfirm 
              ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
              : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:scale-105'
            }`}
          onClick={handleDeleteClick}
        >
          {showDeleteConfirm ? (
            <>
              <AlertCircle size={18} />
              Confirme: Excluir Conta
            </>
          ) : (
            <>
              <Trash2 size={18} />
              Excluir Conta
            </>
          )}
        </Button>
        
        {showDeleteConfirm && (
          <p className="text-xs text-red-600 text-center animate-fade-in">
            ⚠️ Esta ação é irreversível. Clique novamente para confirmar.
          </p>
        )}
        
        {!showDeleteConfirm && (
          <p className="text-xs text-customGray-500 text-center flex items-center justify-center gap-1">
            <Heart className="w-3 h-3" />
            Feito com carinho para você
          </p>
        )}
      </div>
    </aside>
  );
};

export default EditSidebar;