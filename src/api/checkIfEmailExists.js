export async function checkIfEmailExists(email) {
  const apiUrl = `${import.meta.env.VITE_API_URL}/usuario/getByEmail/${encodeURIComponent(email)}`;

  try {
    const response = await fetch(apiUrl);

    if (response.status === 204) {
      return false; // E-mail não existe
    }

    if (!response.ok) {
      throw new Error('Erro na requisição');
    }

    const data = await response.json();

    return !!data; // E-mail existe se data não for null
  } catch (error) {
    console.error('Erro ao verificar e-mail:', error);
    return false;
  }
}
