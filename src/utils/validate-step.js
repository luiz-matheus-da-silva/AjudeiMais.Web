import { checkIfEmailExists } from "../api/checkIfEmailExists";

export function isValidCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let sum = 0,
    rest;
  for (let i = 1; i <= 9; i++)
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  return rest === parseInt(cpf.substring(10, 11));
}

export async function validateStep(step, form, setErrors) {
  const newErrors = {};
  let isValid = true;

  if (step === 1) {
    // Nome completo: obrigatório e deve conter pelo menos 2 palavras e mínimo de 6 caracteres
    if (!form.NomeCompleto.trim()) {
      newErrors.NomeCompleto = "Nome completo é obrigatório.";
      isValid = false;
    } else if (
      form.NomeCompleto.trim().split(" ").length < 2 ||
      form.NomeCompleto.trim().length < 6
    ) {
      newErrors.NomeCompleto = "Informe o nome completo (nome e sobrenome).";
      isValid = false;
    }

    if (!form.Documento.trim()) {
      newErrors.Documento = "O CPF é obrigatório.";
      isValid = false;
    } else {
      const cleanedDoc = form.Documento.replace(/\D/g, "");
      if (cleanedDoc.length !== 11) {
        newErrors.Documento = "CPF deve ter 11 dígitos.";
        isValid = false;
      } else if (!isValidCPF(form.Documento)) {
        newErrors.Documento = "CPF inválido.";
        isValid = false;
      }
    }

  if (!form.Email.trim()) {
    newErrors.Email = "Email é obrigatório.";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(form.Email)) {
    newErrors.Email = "Email inválido.";
    isValid = false;
  } else {
    const emailExists = await checkIfEmailExists(form.Email);
    if (emailExists) {
      newErrors.Email = "Email já cadastrado.";
      isValid = false;
    }
  }

    if (!form.Telefone.trim()) {
      newErrors.Telefone = "Telefone celular é obrigatório.";
      isValid = false;
    } else if (form.Telefone.replace(/\D/g, "").length < 10) {
      newErrors.Telefone = "Telefone inválido.";
      isValid = false;
    }
  } else if (step === 2) {
    if (!form.CEP.trim()) {
      newErrors.CEP = "CEP é obrigatório.";
      isValid = false;
    } else if (form.CEP.replace(/\D/g, "").length !== 8) {
      newErrors.CEP = "CEP deve ter 8 dígitos.";
      isValid = false;
    }

    if (!form.Rua.trim()) {
      newErrors.Rua = "Rua é obrigatória.";
      isValid = false;
    }
    if (!form.Numero || isNaN(parseInt(form.Numero))) {
      newErrors.Numero = "Número é obrigatório e deve ser um número.";
      isValid = false;
    }
    if (!form.Bairro.trim()) {
      newErrors.Bairro = "Bairro é obrigatório.";
      isValid = false;
    }
    if (!form.Cidade.trim()) {
      newErrors.Cidade = "Cidade é obrigatória.";
      isValid = false;
    }
    if (!form.Estado.trim()) {
      newErrors.Estado = "Estado é obrigatório.";
      isValid = false;
    }
  } else if (step === 3) {
     // Validação da Foto de Perfil
    if (!form.FotoDePerfil) {
      newErrors.FotoDePerfil = "A foto de perfil é obrigatória.";
      isValid = false;
    } else if (form.FotoDePerfil instanceof File) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
        "image/jpg"
      ];
      if (!allowedTypes.includes(form.FotoDePerfil.type)) {
        newErrors.FotoDePerfil = "Formato inválido. Use JPG, PNG, WEBP ou GIF.";
        isValid = false;
      } else if (form.FotoDePerfil.size > 5 * 1024 * 1024) {
        newErrors.FotoDePerfil = "A imagem deve ter no máximo 5MB.";
        isValid = false;
      }
    }
    
    if (!form.aceitoTermos) {
      newErrors.aceitoTermos = "Você deve aceitar os termos de uso.";
      isValid = false;
    }

    if (!form.Senha) {
      newErrors.Senha = "Senha é obrigatória.";
      isValid = false;
    } else if (
      form.Senha.length < 8 ||
      !/[A-Z]/.test(form.Senha) ||
      !/[0-9]/.test(form.Senha) ||
      !/[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\\/]/.test(form.Senha)
    ) {
      newErrors.Senha =
        "A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, um número e um caractere especial.";
      isValid = false;
    }

    if (!form.ConfirmarSenha) {
      newErrors.ConfirmarSenha = "Confirme sua senha.";
      isValid = false;
    } else if (form.Senha !== form.ConfirmarSenha) {
      newErrors.ConfirmarSenha = "As senhas não coincidem.";
      isValid = false;
    }
  }

  setErrors(newErrors);
  return isValid;
}