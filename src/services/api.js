
const API_URL = 'http://localhost:8080';


function extrairMensagem(corpo, status) {
  if (status === 404) {
    return 'Não encontrado na API (erro 404). Confira se o ponto existe e se a URL da API está certa.';
  }
  return corpo?.message || corpo?.erro || corpo?.error || `A API respondeu com erro ${status}.`;
}

async function requisicao(caminho, opcoes = {}) {

  const headers = opcoes.body ? { 'Content-Type': 'application/json' } : {};

  let resposta;
  try {
    resposta = await fetch(`${API_URL}${caminho}`, { headers, ...opcoes });
  } catch {
    
    throw new Error(
      `Sem resposta da API em ${API_URL}. Confira se ela está rodando e se o CORS está liberado para este endereço.`
    );
  }

  if (!resposta.ok) {
    const corpo = await resposta.json().catch(() => ({}));
    throw new Error(extrairMensagem(corpo, resposta.status));
  }

  if (resposta.status === 204) return null;
  return resposta.json();
}



export const listarPontos = () => requisicao('/api/points');

export const buscarPonto = (id) => requisicao(`/api/points/${id}`);

export const criarPonto = (ponto) =>
  requisicao('/api/points', { method: 'POST', body: JSON.stringify(ponto) });

export const atualizarPonto = (id, ponto) =>
  requisicao(`/api/points/${id}`, { method: 'PUT', body: JSON.stringify(ponto) });

export const excluirPonto = (id) =>
  requisicao(`/api/points/${id}`, { method: 'DELETE' });