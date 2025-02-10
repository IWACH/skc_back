// Importaciones
import express from "express";
import cors from "cors";

import routes from "./api/routes";
import { errorMiddleware } from "./api/middlewares/error.middleware";

// Constants configuration
const PORT = 8000;

// Initialize the application
const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "https://tudominio.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Use centralized routes
app.use("/api", routes);

// Start the server
app.listen(PORT, () => {
  return console.log(`Server is running on http://localhost:${PORT}`);
});

// Error middleware
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
