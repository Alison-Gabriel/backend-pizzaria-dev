import "dotenv/config";
import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

// global error middleware
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof Error) {
    return res.status(400).json({
      error: error.message,
    });
  }
  return res.status(500).json({
    error: "Erro no servidor",
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}!`);
});
