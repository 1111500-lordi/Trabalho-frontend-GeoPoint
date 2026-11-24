
import LinhaPonto from './LinhaPonto.jsx';

function TabelaPontos({ pontos, aoExcluir }) {
  return (
    <div className="tabela-container">
      <table className="tabela">
        <caption className="sr-only">
          Lista de pontos geográficos
        </caption>

        <thead>
          <tr>
            <th scope="col" className="col-nome">Nome</th>
            <th scope="col" className="col-descricao">Descrição</th>
            <th scope="col" className="col-numero">Latitude</th>
            <th scope="col" className="col-numero">Longitude</th>
            <th scope="col" className="col-acoes">Ações</th>
          </tr>
        </thead>

        <tbody>
          {pontos.map((ponto) => (
            <LinhaPonto
              key={ponto.id}
              ponto={ponto}
              aoExcluir={aoExcluir}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaPontos;
