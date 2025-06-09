import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Alert } from "../../../components/Alert";
import {
  Eye,
  EyeOff,
  HandHeart,
  User,
  MapPin,
  Sparkles,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import {
  maskPhoneLandline,
  maskCEP,
  maskCNPJ,
  maskCPF,
  maskPhoneMobile,
  maskNome,
} from "../../../utils/masks";
import { validateStep } from "../../../utils/validate-step";
import { searchCEP } from "../../../utils/search-cep";
import RegisterStep1 from "./Steps/RegisterStep1";
import RegisterStep2 from "./Steps/RegisterStep2";
import RegisterStep3 from "./Steps/RegisterStep3";

// Import Lottie and the success animation JSON
import Lottie from "react-lottie";
import successAnimation from "../../../animations/success-animation.json"; // <--- NOVO IMPORT AQUI!

export default function RegisterStepper() {
  const [searchParams] = useSearchParams();
  const initialUserType = searchParams.get("tipo");
  const [userType, setUserType] = useState(
    initialUserType === "instituicao" ? "instituicao" : "doador"
  );

  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    NomeCompleto: "",
    Documento: "",
    Email: "",
    Senha: "",
    ConfirmarSenha: "",
    Role: "role",
    CEP: "",
    Rua: "",
    Numero: "",
    Complemento: "",
    Bairro: "",
    Cidade: "",
    Estado: "",
    FotoDePerfil: null,
    TelefoneFixo: "",
    Telefone: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [previewFoto, setPreviewFoto] = useState(null);

  const [alert, setAlert] = React.useState(null);

  useEffect(() => {
    setForm((prevForm) => ({ ...prevForm, Role: userType }));
  }, [userType]);

  // Lottie Options for Success Animation
  const successLottieOptions = {
    loop: false, // Usually, success animations play once
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    let newValue = value;

    if (name === "Documento") {
      newValue = maskCPF(value);
      // Se for CNPJ (para instituições), adicione a lógica aqui
      if (userType === "instituicao") {
        newValue = maskCNPJ(value);
      }
    }
    if (name === "NomeCompleto") {
      newValue = maskNome(value);
    }
    if (name === "CEP") {
      newValue = maskCEP(value);
    }
    if (name === "TelefoneFixo") {
      newValue = maskPhoneLandline(value);
    }
    if (name === "Telefone") {
      newValue = maskPhoneMobile(value);
    }

    if (type === "file") {
      const file = files[0];
      setForm({ ...form, [name]: file });
      if (file) {
        setPreviewFoto(URL.createObjectURL(file));
      } else {
        setPreviewFoto(null);
      }
    } else {
      setForm({
        ...form,
        [name]: type === "checkbox" ? checked : newValue,
      });
    }

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    }
  };

  const handleTermsChange = (checked) => {
    setForm((prevForm) => ({
      ...prevForm,
      aceitoTermos: checked,
    }));
    if (errors.aceitoTermos) {
      setErrors((prevErrors) => ({ ...prevErrors, aceitoTermos: undefined }));
    }
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep, form, setErrors, userType); // Passe userType para validação
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await validateStep(currentStep, form, setErrors, userType); // Passe userType para validação
    if (!isValid) {
      setAlert({
        type: "danger",
        message: "Por favor, corrija os erros no formulário antes de continuar.",
      });
      return;
    }

    setIsLoading(true);
    setAlert(null);

    const apiUrl = `${import.meta.env.VITE_API_URL}/usuario`;

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;

      if (data?.success) {
        setAlert({
          type: "success",
          message: data?.message || "Conta criada com sucesso!",
        });
        setRegistrationSuccess(true); // <--- ATENÇÃO: Isso agora ativará a tela de sucesso animada
      } else {
        setAlert({
          type: "danger",
          message: data?.message || "Erro ao criar conta.",
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Erro ao criar conta. Tente novamente.";

      setAlert({
        type: "danger",
        message: errorMessage,
      });

      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <RegisterStep1
            form={form}
            errors={errors}
            handleChange={handleChange}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
            userType={userType} // Passa userType para renderizar campos específicos
          />
        );
      case 2:
        return (
          <RegisterStep2
            form={form}
            handleChange={handleChange}
            searchCEP={searchCEP}
            setForm={setForm}
            setErrors={setErrors}
            errors={errors}
          />
        );
      case 3:
        return (
          <RegisterStep3
            form={form}
            handleChange={handleChange}
            previewFoto={previewFoto}
            errors={errors}
            handleTermsChange={handleTermsChange}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            showConfirmPassword={showConfirmPassword}
            toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
          />
        );
      default:
        return null;
    }
  };

  const stepTitles = ["Dados Pessoais", "Endereço", "Finalizar"];
  const stepIcons = [User, MapPin, Sparkles]; // Ícones para cada passo

  return (
    <>
      {alert && (
        <Alert type={alert.type} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary-light to-secondary p-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent/20 to-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Container principal para Logo e Formulário - Flexbox para organizar lado a lado */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-5xl relative z-10">
          {/* Seção da Logo (Esquerda) */}
          <div className="flex-1 text-center lg:text-left p-6 lg:p-0">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-3xl mb-6 shadow-xl">
              <HandHeart className="w-14 h-14 text-white" />
            </div>
            <h1 className="text-5xl font-heading text-primary font-bold leading-tight mb-4">
              Transforme <span className="text-secondary">Vidas</span> com Sua Doação.
            </h1>
            <p className="text-customGray-700 text-lg max-w-md mx-auto lg:mx-0">
              Junte-se à nossa rede de solidariedade e faça a diferença no mundo.
            </p>
          </div>

          {/* Seção do Formulário (Direita) */}
          <div className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-full max-w-lg space-y-8 transform transition-all duration-500 hover:shadow-3xl relative z-10 border border-white/20">
            {/* Header do Formulário (mantido para contexto interno do card) */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-heading text-primary font-bold">
                Crie sua conta
              </h1>
              <p className="text-customGray-600 text-lg">
                Comece sua jornada de doação agora.
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="relative">
              <div className="flex justify-between items-center mb-8">
                {[1, 2, 3].map((step, index) => {
                  const IconComponent = stepIcons[index];
                  const isActive = currentStep === step;
                  const isCompleted = currentStep > step;

                  return (
                    <div
                      key={step}
                      className="flex flex-col items-center space-y-2 relative z-10"
                    >
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-all duration-500 transform
                        ${
                          isActive
                            ? "bg-gradient-to-br from-secondary to-accent text-white scale-110 shadow-lg shadow-secondary/30"
                            : isCompleted
                            ? "bg-gradient-to-br from-accent to-secondary text-white shadow-md"
                            : "bg-customGray-100 text-customGray-400 border-2 border-customGray-200"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle size={20} />
                        ) : (
                          <IconComponent size={20} />
                        )}
                      </div>
                      <span
                        className={`text-xs font-semibold transition-colors duration-300 ${
                          isActive
                            ? "text-secondary"
                            : isCompleted
                            ? "text-accent"
                            : "text-customGray-500"
                        }`}
                      >
                        {stepTitles[index]}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Progress Line */}
              <div className="absolute top-6 left-6 right-6 h-0.5 bg-customGray-200 -z-0">
                <div
                  className="h-full bg-gradient-to-r from-secondary to-accent transition-all duration-700 ease-out rounded-full"
                  style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                ></div>
              </div>
            </div>

            {registrationSuccess ? (
              <div className="text-center space-y-6 py-8">
                {/* Lottie Animation for Success */}
                <Lottie options={successLottieOptions} height={150} width={150} /> {/* Ajuste o tamanho conforme desejar */}

                <div className="space-y-3">
                  <h2 className="text-2xl font-heading text-primary font-bold">
                    🎉 Parabéns!
                  </h2>
                  <p className="text-lg text-customGray-600">
                    Sua conta foi criada com sucesso!
                  </p>
                  <p className="text-sm text-customGray-500">
                    Agora você pode fazer login e começar a fazer a diferença.
                  </p>
                </div>
                <Link to="/login" className="block w-full">
                  <Button className="w-full py-4 text-lg font-accent font-semibold rounded-xl shadow-lg bg-gradient-to-r from-accent to-secondary text-white hover:shadow-xl hover:scale-105 transition-all duration-300 border-0">
                    Ir para o Login
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errors.general && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-center text-sm">
                      {errors.general}
                    </p>
                  </div>
                )}

                {renderStep()}

                {/* Navigation */}
                <div className="flex justify-between items-center gap-4">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center gap-2 px-6 py-3 bg-customGray-100 text-customGray-700 hover:bg-customGray-200 font-semibold rounded-xl transition-all duration-300 border-0 hover:scale-105"
                    >
                      <ArrowLeft size={18} />
                      Voltar
                    </Button>
                  )}

                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center gap-2 ml-auto px-8 py-3 bg-gradient-to-r from-secondary to-accent text-white hover:shadow-lg font-semibold rounded-xl transition-all duration-300 border-0 hover:scale-105"
                    >
                      Próximo
                      <ArrowRight size={18} />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      className="flex items-center justify-center gap-1 md:gap-3 w-1/2 md:w-3/4 py-4 text-sm md:text-lg font-accent font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-accent to-secondary text-white hover:scale-105 border-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Criando sua conta...
                        </>
                      ) : (
                        <>
                          <CheckCircle size={20} />
                          Concluir Cadastro
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            )}

            {/* Footer Link */}
            <div className="text-center pt-6 border-t border-customGray-100">
              <p className="text-sm text-customGray-600">
                Já tem uma conta?{" "}
                <Link
                  to="/login"
                  className="text-secondary font-semibold hover:text-secondary-dark hover:underline transition-all duration-200"
                >
                  Faça Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}