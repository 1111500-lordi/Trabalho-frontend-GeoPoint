
import { NavLink } from 'react-router-dom';

function Navbar({ tema, alternarTema }) {
  return (
    <nav className="navbar">
      <div className="navbar-conteudo">
        <span className="navbar-logo">GeoPoint</span>

        <div className="navbar-links">
          <NavLink to="/pontos">Pontos</NavLink>
          <NavLink to="/pontos/novo">Novo ponto</NavLink>
        </div>

        <button
          className="botao-tema"
          onClick={alternarTema}
          aria-label="Alternar tema"
          title="Alternar tema"
        >
          {tema === 'claro' ? '🌙 Escuro' : '☀ Claro'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
