
import { Link } from 'react-router-dom';
import Botao from './Botao.jsx';

function LinhaPonto({ ponto, aoExcluir }) {
  return (
    <tr>
      <td data-label="Nome" className="col-nome">
        <Link to={`/pontos/${ponto.id}`} className="link-nome">
          {ponto.name}
        </Link>
      </td>

      <td data-label="Descrição" className="col-descricao">
        {ponto.description || '—'}
      </td>

      <td data-label="Latitude" className="col-numero">
        {ponto.latitude}
      </td>

      <td data-label="Longitude" className="col-numero">
        {ponto.longitude}
      </td>

      <td data-label="Ações" className="col-acoes">
        <div className="acoes">
          <Botao to={`/pontos/${ponto.id}`} variante="secundario">
            Ver
          </Botao>

          <Botao to={`/pontos/${ponto.id}/editar`} variante="secundario">
            Editar
          </Botao>

          <Botao variante="perigo" onClick={() => aoExcluir(ponto)}>
            Excluir
          </Botao>
        </div>
      </td>
    </tr>
  );
}

export default LinhaPonto;
