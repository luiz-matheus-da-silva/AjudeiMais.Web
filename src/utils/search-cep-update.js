// src/utils/search-cep-update.js
import axios from 'axios';

/**
 * Busca dados de endereço pelo CEP usando a API do ViaCEP.
 *
 * @param {string} cep O CEP a ser pesquisado (apenas números, 8 dígitos).
 * @returns {Promise<object | null>} Um objeto com os dados do endereço (logradouro, bairro, localidade, uf)
 * ou um objeto com { erro: true, message: string } em caso de falha,
 * ou null se o CEP não for encontrado/válido.
 */
export const searchCEPUpdate = async (cep) => {
  // Limpa o CEP para garantir que tenha apenas dígitos
  const cleanedCep = cep ? cep.replace(/\D/g, "") : "";

  if (cleanedCep.length !== 8) {
    console.warn("searchCEPUpdate: CEP inválido para busca (deve ter 8 dígitos numéricos).", cep);
    return { erro: true, message: "Formato de CEP inválido." };
  }

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cleanedCep}/json/`);
    const data = response.data;

    // A API ViaCEP retorna um objeto com 'erro: true' se o CEP for inválido/não encontrado
    if (data.erro) {
      console.warn("searchCEPUpdate: CEP não encontrado na ViaCEP:", cleanedCep);
      return { erro: true, message: "CEP não encontrado ou inexistente." };
    }

    // Retorna os dados completos do endereço (você pode selecionar apenas os que precisa)
    return {
      logradouro: data.logradouro,
      bairro: data.bairro,
      localidade: data.localidade, // Corresponde à cidade
      uf: data.uf, // Corresponde ao estado
      // Adicione outros campos se precisar (ex: ddd, ibge, gia)
    };

  } catch (error) {
    console.error("searchCEPUpdate: Erro na requisição à ViaCEP:", error);
    // Erros de rede, servidor fora do ar, etc.
    return { erro: true, message: "Não foi possível buscar o CEP. Tente novamente." };
  }
};