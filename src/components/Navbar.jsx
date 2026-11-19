import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <NavLink to="/pontos">Pontos</NavLink>
      {' | '}
      <NavLink to="/pontos/novo">Novo ponto</NavLink>
    </nav>
  );
}

export default Navbar;