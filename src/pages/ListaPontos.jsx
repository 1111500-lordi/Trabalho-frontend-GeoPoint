
import { useState, useEffect } from 'react';
import { listarPontos, excluirPonto } from '../services/api.js';
import { normalizar } from '../utils/texto.js';
import FiltroPontos from '../components/FiltroPontos.jsx';
import TabelaPontos from '../components/TabelaPontos.jsx';

function ListaPontos() {
  const [pontos, setPontos] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    listarPontos()
      .then((dados) => setPontos(dados))
      .catch((erro) => console.error('Erro:', erro.message));
  }, []);

  const pontosFiltrados = pontos.filter((ponto) => {
    const nome = normalizar(ponto.name);
    const descricao = normalizar(ponto.description);
    const busca = normalizar(filtro);

    return nome.includes(busca) || descricao.includes(busca);
  });

  async function aoExcluir(ponto) {
    const confirmar = window.confirm(
      `Deseja excluir o ponto "${ponto.name}"?`
    );

    if (!confirmar) return;

    try {
      await excluirPonto(ponto.id);
      setPontos(pontos.filter((item) => item.id !== ponto.id));
    } catch (erro) {
      alert('Erro ao excluir: ' + erro.message);
    }
  }

  return (
    <div>
      <h1>Lista de pontos</h1>

      <FiltroPontos valor={filtro} aoMudar={setFiltro} />

      <TabelaPontos
        pontos={pontosFiltrados}
        aoExcluir={aoExcluir}
      />
    </div>
  );
}

export default ListaPontos;
