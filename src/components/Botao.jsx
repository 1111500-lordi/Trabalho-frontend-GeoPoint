
import { Link } from 'react-router-dom';

function Botao({ children, variante = 'primario', to, tipo = 'button', ...resto }) {
  const classe = `botao botao-${variante}`;

  if (to) {
    return (
      <Link to={to} className={classe} {...resto}>
        {children}
      </Link>
    );
  }

  return (
    <button type={tipo} className={classe} {...resto}>
      {children}
    </button>
  );
}

export default Botao;
