import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ListaPontos from './pages/ListaPontos.jsx';
import FormularioPonto from './pages/FormularioPonto.jsx';
import DetalhePonto from './pages/DetalhePonto.jsx';
import NaoEncontrada from './pages/NaoEncontrada.jsx';

function App() {
  return (
    <>
      <Navbar />

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