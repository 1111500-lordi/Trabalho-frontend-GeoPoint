import { useEffect } from 'react';
import { listarPontos } from '../services/api.js';

function ListaPontos() {
  useEffect(() => {
    listarPontos()
      .then((pontos) => console.log('Pontos:', pontos))
      .catch((erro) => console.log('Erro:', erro.message));
  }, []);

  return <h1>Lista de pontos</h1>;
}

export default ListaPontos;