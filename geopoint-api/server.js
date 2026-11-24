import express from "express";
import cors from "cors";
import { randomUUID } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const app = express();
const PORT = 8080;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "data", "points.json");

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

function readPoints() {
  if (!existsSync(DATA_FILE)) return [];
  return JSON.parse(readFileSync(DATA_FILE, "utf8"));
}

function savePoints(points) {
  writeFileSync(DATA_FILE, JSON.stringify(points, null, 2), "utf8");
}

function validatePoint(body) {
  const errors = [];
  if (typeof body.name !== "string" || body.name.trim().length === 0) {
    errors.push("O nome é obrigatório.");
  } else if (body.name.trim().length > 100) {
    errors.push("O nome deve ter no máximo 100 caracteres.");
  }

  if (body.description !== undefined && body.description !== null) {
    if (typeof body.description !== "string") {
      errors.push("A descrição deve ser um texto.");
    } else if (body.description.length > 255) {
      errors.push("A descrição deve ter no máximo 255 caracteres.");
    }
  }

  if (body.latitude === undefined || body.latitude === null ||
      typeof body.latitude !== "number" || !Number.isFinite(body.latitude) ||
      body.latitude < -90 || body.latitude > 90) {
    errors.push("A latitude é obrigatória e deve ser um número entre -90 e 90.");
  }

  if (body.longitude === undefined || body.longitude === null ||
      typeof body.longitude !== "number" || !Number.isFinite(body.longitude) ||
      body.longitude < -180 || body.longitude > 180) {
    errors.push("A longitude é obrigatória e deve ser um número entre -180 e 180.");
  }

  return errors;
}

app.get("/", (_req, res) => {
  res.json({ message: "GeoPoint API está funcionando.", resource: "/api/points" });
});

// GET /api/points — listar todos os pontos
app.get("/api/points", (_req, res) => {
  res.json(readPoints());
});

// GET /api/points/:id — consultar um ponto
app.get("/api/points/:id", (req, res) => {
  const point = readPoints().find(item => item.id === req.params.id);
  if (!point) return res.status(404).json({ message: "Ponto não encontrado." });
  res.json(point);
});

// POST /api/points — cadastrar um ponto
app.post("/api/points", (req, res) => {
  const errors = validatePoint(req.body);
  if (errors.length) return res.status(400).json({ message: "Dados inválidos.", errors });

  const points = readPoints();
  const newPoint = {
    id: randomUUID(),
    name: req.body.name.trim(),
    description: req.body.description?.trim() ?? "",
    latitude: req.body.latitude,
    longitude: req.body.longitude
  };

  points.push(newPoint);
  savePoints(points);
  res.status(201).json(newPoint);
});

// PUT /api/points/:id — atualizar um ponto
app.put("/api/points/:id", (req, res) => {
  const errors = validatePoint(req.body);
  if (errors.length) return res.status(400).json({ message: "Dados inválidos.", errors });

  const points = readPoints();
  const index = points.findIndex(item => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Ponto não encontrado." });

  const updatedPoint = {
    id: req.params.id,
    name: req.body.name.trim(),
    description: req.body.description?.trim() ?? "",
    latitude: req.body.latitude,
    longitude: req.body.longitude
  };

  points[index] = updatedPoint;
  savePoints(points);
  res.json(updatedPoint);
});

// DELETE /api/points/:id — excluir um ponto
app.delete("/api/points/:id", (req, res) => {
  const points = readPoints();
  const filteredPoints = points.filter(item => item.id !== req.params.id);

  if (filteredPoints.length === points.length) {
    return res.status(404).json({ message: "Ponto não encontrado." });
  }

  savePoints(filteredPoints);
  res.status(204).send();
});

// JSON inválido enviado no corpo da requisição
app.use((err, _req, res, _next) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ message: "JSON inválido." });
  }
  res.status(500).json({ message: "Erro interno do servidor." });
});

app.listen(PORT, () => {
  console.log(`GeoPoint API rodando em http://localhost:${PORT}`);
  console.log(`Endpoint de pontos: http://localhost:${PORT}/api/points`);
});
