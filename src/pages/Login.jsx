import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, HandHeart, Building } from "lucide-react";

export default function Login() {
  const [userType, setUserType] = useState("doador");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", senha: "", manterConectado: false });
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Tentando login como:", userType, form);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    // As classes Tailwind agora buscarão as definições do tailwind.config.js,
    // que por sua vez, usam suas variáveis CSS do :root.
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light to-secondary-light animate-gradient-xy font-base">
      <div className="bg-surface shadow-lg rounded-xl p-8 w-full max-w-md space-y-6 transform transition-all duration-300 hover:scale-[1.01]">
        <h2 className="text-3xl font-heading text-center text-primary leading-tight">
          Bem-vindo de volta!
          <br />
          <span className="text-lg font-base text-customGray-600">
            Faça o login para continuar sua jornada de doação.
          </span>
        </h2>

        {/* Seleção de Tipo de Usuário (Doador / Instituição) */}
        <div className="flex gap-4 justify-center">
          <Button
            variant={userType === "doador" ? "default" : "outline"}
            onClick={() => setUserType("doador")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
              userType === "doador"
                ? "bg-primary text-white hover:bg-primary-dark"
                : "border border-primary text-primary hover:bg-primary-light hover:text-white"
            }`}
          >
            <HandHeart size={20} /> Sou Doador
          </Button>
          <Button
            variant={userType === "instituicao" ? "default" : "outline"}
            onClick={() => setUserType("instituicao")}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
              userType === "instituicao"
                ? "bg-primary text-white hover:bg-primary-dark"
                : "border border-primary text-primary hover:bg-primary-light hover:text-white"
            }`}
          >
            <Building size={20} /> Sou Instituição
          </Button>
        </div>

        {/* Formulário de Login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-customGray-700 font-semibold mb-2">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="seuemail@exemplo.com"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 p-3 border border-customGray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200"
            />
          </div>

          <div>
            <Label htmlFor="senha" className="text-customGray-700 font-semibold mb-2">Senha</Label>
            <div className="relative mt-1">
              <Input
                id="senha"
                name="senha"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.senha}
                onChange={handleChange}
                required
                className="p-3 pr-10 border border-customGray-300 rounded-md focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-customGray-500 hover:text-customGray-700 transition-colors duration-200"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="manter"
                name="manterConectado"
                checked={form.manterConectado}
                onCheckedChange={(checked) =>
                  setForm({ ...form, manterConectado: !!checked })
                }
                className="w-4 h-4 text-primary rounded focus:ring-primary"
              />
              <Label htmlFor="manter" className="text-sm text-customGray-600 cursor-pointer">
                Manter conectado
              </Label>
            </div>
            <a href="/esqueci-senha" className="text-sm text-secondary hover:underline hover:text-secondary-dark transition-colors duration-200">
              Esqueci a senha?
            </a>
          </div>

          {/* Botão de Entrar com estado de Loading */}
          <Button
            type="submit"
            className="w-full py-3 text-lg font-accent font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-300 bg-accent text-white hover:bg-accent-dark disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Entrando...
              </div>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>

        {/* Link para Criar Conta */}
        <p className="text-center text-sm text-customGray-600 mt-6">
          Não tem uma conta?{" "}
          <a href={`/registrar?tipo=${userType}`} className="text-secondary font-semibold hover:underline hover:text-secondary-dark transition-colors duration-200">
            Crie uma agora!
          </a>
        </p>
      </div>
    </div>
  );
}