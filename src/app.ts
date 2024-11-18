// Importaciones
import express from "express";

import routes from "./routes";
import { errorMiddleware } from "./shared/errors/middleware/error.middleware";

// Configuración de constantes
const PORT = 8000;

// Inicialización de la aplicación
const app = express();

// Middleware
app.use(express.json());

// Usar las rutas centralizadas
app.use("/api", routes);

// Iniciar el servidor
app.listen(PORT, () => {
  return console.log(`Server is running on http://localhost:${PORT}`);
});

// Middleware de error debe ir después de las rutas
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    errorMiddleware(err, req, res, next);
  }
);
