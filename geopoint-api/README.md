# GeoPoint API

Backend REST para o projeto GeoPoint, implementado com Node.js e Express.

## Requisitos
- Node.js 20 ou superior
- npm

## Como executar

Abra o terminal nesta pasta e rode:

```bash
npm install
npm run dev
```

A API ficará disponível em `http://localhost:8080`.

## Endpoints

| Método | Rota | Ação |
|---|---|---|
| GET | `/api/points` | Lista todos os pontos |
| GET | `/api/points/:id` | Consulta um ponto |
| POST | `/api/points` | Cadastra um ponto |
| PUT | `/api/points/:id` | Atualiza um ponto |
| DELETE | `/api/points/:id` | Exclui um ponto |

## Exemplo de JSON para POST e PUT

```json
{
  "name": "Praça Central",
  "description": "Praça principal da cidade",
  "latitude": -28.2825,
  "longitude": -52.7869
}
```

O `id` é gerado automaticamente. Latitude e longitude devem ser números.

## CORS
Por padrão, a API aceita requisições do frontend em `http://localhost:5173`.

## Persistência
Os registros são armazenados em `data/points.json`. Não apague esse arquivo enquanto estiver usando a API.
