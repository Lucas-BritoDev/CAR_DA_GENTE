import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // ====== MÓDULO MOTOR (NÚCLEO DETERMINÍSTICO) ======
  // As rotas FastAPI solicitadas serão mapeadas para Express
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "motor-deterministico" });
  });

  // Mock Database endpoints (Fase 4: Supabase Mock)
  app.get("/api/db/documentos_pendentes", (req, res) => {
    res.json([
      { id: 1, imovel_id: "sitio_boa_esperanca_001", titulo: "Notificação de Regularização de APP e RL", status: "pendente", quero_entender: true, data: "2026-06-20" }
    ]);
  });

  app.get("/api/db/documentos_analista", (req, res) => {
    res.json([
      { id: 1, imovel_id: "sitio_boa_esperanca_001", tipo: "Outorga", status: "verde" },
      { id: 2, imovel_id: "sitio_boa_esperanca_001", tipo: "PRAD/PRADA", status: "amarelo" },
      { id: 3, imovel_id: "sitio_boa_esperanca_001", tipo: "Estudo de Fauna", status: "verde" },
      { id: 4, imovel_id: "sitio_boa_esperanca_001", tipo: "Estudo de Flora", status: "verde" }
    ]);
  });

  app.get("/api/db/metas_comunidade", (req, res) => {
    res.json({
      associacao: "Vila Nova",
      porcentagem_regular: 80,
      total_produtores: 120
    });
  });

  // FastAPI: POST /analisar
  app.post("/api/analisar", async (req, res) => {
    try {
      // dynamically import to bypass cjs issues if any, or just import
      const { analisar } = await import("./src/motor/laudo.js");
      const { sitioBoaEsperancaInput } = await import("./src/fixtures/sitio_boa_esperanca.js");

      // using the fixture for demo purposes when body is empty
      const input = Object.keys(req.body).length > 0 ? req.body : sitioBoaEsperancaInput;
      const laudo = analisar(input);
      res.json(laudo);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // FastAPI: POST /pra/minuta
  app.post("/api/pra/minuta", (req, res) => {
    res.json({ minuta: "Eu, Raimundo, portador do CPF XXX, comprometo-me a recompor 15m de APP e compensar 4.2ha de RL via CRA conforme as leis estipuladas no laudo Cidadão." });
  });

  // FastAPI: GET /geo/camadas/:imovel_id
  app.get("/api/geo/camadas/:imovel_id", async (req, res) => {
    try {
      const { sitioBoaEsperancaInput } = await import("./src/fixtures/sitio_boa_esperanca.js");
      res.json({
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: sitioBoaEsperancaInput.geometria.geometry,
            properties: { zona: "imovel" }
          }
        ]
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Express v5 needs *all for catch-all, but we have express 4
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
