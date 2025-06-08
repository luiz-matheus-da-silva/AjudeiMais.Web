// Nome: só letras e espaços, remove números e caracteres especiais
export function maskNome(value) {
  return value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
}

// CPF: 999.999.999-99 e validação de CPF real
export function maskCPF(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .slice(0, 14);
}

export function maskCNPJ(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2")
    .slice(0, 18);
}

// Telefone Fixo: (XX) XXXX-XXXX
export function maskPhoneLandline(value) {
  if (!value) return "";
  return value
    .replace(/\D/g, "") // Remove tudo que não é dígito
    .replace(/^(\d{2})(\d)/g, "($1) $2") // Adiciona parênteses no DDD
    .replace(/(\d{4})(\d)/, "$1-$2") // Adiciona o hífen após os primeiros 4 dígitos
    .slice(0, 14); // Limita o tamanho total da string (contando parênteses, espaço e hífen)
}

// Telefone Celular: (XX) XXXXX-XXXX
export function maskPhoneMobile(value) {
  if (!value) return "";
  return value
    .replace(/\D/g, "") // Remove tudo que não é dígito
    .replace(/^(\d{2})(\d)/g, "($1) $2") // Adiciona parênteses no DDD
    .replace(/(\d{5})(\d)/, "$1-$2") // Adiciona o hífen após os primeiros 5 dígitos (para celular)
    .slice(0, 15); // Limita o tamanho total da string (contando parênteses, espaço e hífen)
}

export function maskCEP(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 9);
}