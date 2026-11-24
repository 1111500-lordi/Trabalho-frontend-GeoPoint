import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { buscarPonto, excluirPonto } from '../services/api.js';
import Botao from '../components/Botao.jsx';

function DetalhePonto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ponto, setPonto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

    useEffect(() => {
    buscarPonto(id)
      .then((dados) => setPonto(dados))
      .catch((erro) => setErro(erro.message))
      .finally(() => setCarregando(false));
  }, [id]);

    async function handleExcluir() {
    if (!window.confirm(`Excluir o ponto "${ponto.name}"?`)) {
      return;
    }

    try {
      await excluirPonto(id);
      navigate('/pontos');
    } catch (erro) {
      setErro(`Não foi possível excluir "${ponto.name}". ${erro.message}`);
    }
  }

  return (
    <section>
      {carregando && <p>Carregando ponto...</p>}

      {erro && <p>{erro}</p>}

      {ponto && (
        <article>
          <h1>{ponto.name}</h1>

          <dl>
            <dt>Descrição</dt>
            <dd>{ponto.description || '—'}</dd>

            <dt>Latitude</dt>
            <dd>{ponto.latitude}</dd>

            <dt>Longitude</dt>
            <dd>{ponto.longitude}</dd>

            <dt>ID</dt>
            <dd>{ponto.id}</dd>
          </dl>

          <div className="acoes">
            <Botao to={`/pontos/${ponto.id}/editar`}>
              Editar
            </Botao>

            <Botao variante="perigo" onClick={handleExcluir}>
              Excluir
            </Botao>

            <Botao to="/pontos" variante="secundario">
              Voltar
            </Botao>
          </div>
        </article>
      )}

      {!ponto && !carregando && (
        <Botao to="/pontos" variante="secundario">
          Voltar para a lista
        </Botao>
      )}
    </section>
  );
}

export default DetalhePonto;
