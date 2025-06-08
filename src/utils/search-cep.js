export async function searchCEP(cepValue, setForm, setErrors) {
  const cep = cepValue.replace(/\D/g, '');
  if (cep.length === 8) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setForm((prevForm) => ({
          ...prevForm,
          Rua: data.logradouro || "",
          Bairro: data.bairro || "",
          Cidade: data.localidade || "",
          Estado: data.uf || "",
        }));
        setErrors((prevErrors) => ({
          ...prevErrors,
          CEP: undefined,
          Rua: undefined,
          Bairro: undefined,
          Cidade: undefined,
          Estado: undefined,
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, CEP: "CEP não encontrado." }));
      }
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, CEP: "Erro ao buscar CEP." }));
    }
  } else if (cep.length > 0 && cep.length < 8) {
    setErrors((prevErrors) => ({ ...prevErrors, CEP: "CEP inválido. Deve conter 8 dígitos." }));
  }
}