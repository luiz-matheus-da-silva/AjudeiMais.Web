import React, { useState, useEffect } from "react";
import {
  User,
  MapPin,
  Lock,
  Check,
  ChevronRight,
  Trash2,
  Shield,
  Heart,
  AlertTriangle,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    id: "personal",
    label: "Dados Pessoais",
    description: "Nome, documento, email e telefones",
    icon: <User size={20} />,
    color: "from-primary to-secondary",
    completed: false,
    required: true,
  },
  {
    id: "address",
    label: "Endereço",
    description: "Seu endereço principal",
    icon: <MapPin size={20} />,
    color: "from-secondary to-accent",
    completed: false,
    required: true,
  },
  {
    id: "security",
    label: "Senha",
    description: "Altere sua senha de acesso",
    icon: <Lock size={20} />,
    color: "from-accent to-primary",
    completed: false,
    required: true,
  },
];

export default function EditSidebar({
  currentStep = 0,
  onStepChange,
  onDeleteAccount,
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);


  // Handler para steps
  const handleStepClick = (idx) => {
    if (onStepChange) onStepChange(idx);
  };

  // Handler para exclusão
  const handleDeleteClick = () => {
    if (showDeleteConfirm) {
      onDeleteAccount && onDeleteAccount();
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 5000);
    }
  };

  return (
    <aside className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 p-6 w-full md:w-80 flex flex-col gap-8 overflow-y-auto relative">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
          <Settings className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-heading font-bold text-primary-dark">
          Editar Perfil
        </h2>
        <p className="text-sm text-customGray-600">
          Mantenha seus dados sempre atualizados
        </p>
      </div>

      
      {/* Steps */}
      <nav className="flex flex-col gap-3 flex-1">
        {steps.map((step, idx) => {
          const isActive = idx === currentStep;
          const isCompleted = idx < currentStep;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => handleStepClick(idx)}
              className={`group relative p-2 rounded-xl transition-all duration-300 text-left border-2 overflow-hidden
                ${isActive
                  ? 'border-accent bg-gradient-to-r from-accent/10 to-accent/5 shadow-lg scale-[1.02]'
                  : isCompleted
                    ? 'border-green-200 bg-green-50/50 hover:bg-green-100/50'
                    : 'border-customGray-200 bg-white/50 hover:bg-customGray-50/50 hover:border-customGray-300'
                }`}
            >
              <div className="relative flex items-start gap-4">
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
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-customGray-200 pt-6 space-y-4">
       
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
              <Trash2 size={18} />
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
}