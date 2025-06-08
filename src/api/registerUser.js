import { useState } from "react";

export function registerUser(url) {
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  async function postData(body) {
    setLoading(true);
    setAlert(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Erro na requisição");
      }

      const data = await response.json();
      setAlert({ type: "success", message: data?.message || "Cadastro realizado com sucesso!" });
      return data; // Retorna a resposta para o handleSubmit

    } catch (error) {
      setAlert({ type: "error", message: error.message || "Erro ao criar cadastro." });
      throw error; // Propaga o erro para o handleSubmit
    } finally {
      setLoading(false);
    }
  }

  return { postData, alert, setAlert, loading };
}
