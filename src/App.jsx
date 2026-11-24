import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ListaPontos from './pages/ListaPontos.jsx';
import FormularioPonto from './pages/FormularioPonto.jsx';
import DetalhePonto from './pages/DetalhePonto.jsx';
import NaoEncontrada from './pages/NaoEncontrada.jsx';

function App() {
    const [tema, setTema] = useState(() => {
    return localStorage.getItem('tema') || 'claro';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-tema', tema);
    localStorage.setItem('tema', tema);
  }, [tema]);

    function alternarTema() {
    setTema(tema === 'claro' ? 'escuro' : 'claro');
  }

  return (
    <>
      <Navbar tema={tema} alternarTema={alternarTema} />

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/pontos" replace />} />
          <Route path="/pontos" element={<ListaPontos />} />
          <Route path="/pontos/novo" element={<FormularioPonto />} />
          <Route path="/pontos/:id/editar" element={<FormularioPonto />} />
          <Route path="/pontos/:id" element={<DetalhePonto />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>
    </>
  );
}

export default App;