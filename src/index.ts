import express from "express";
import { PORT } from "./env";
import morgan from "morgan";
import cors from "cors";
import { AppDataSource } from "./db";
import userRoutes from "./routes/user.routes";

async function startServer(port: number) {
  const app = express();
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(cors());

  app.use("/user", userRoutes);

  try {
    await AppDataSource.initialize();

    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    server.on("error", (error: NodeJS.ErrnoException) => {
      if (error.syscall !== "listen") {
        throw error;
      }

      console.error(`Error starting the server: ${error.message}`);
      process.exit(1);
    });

    console.log("Database connected");
  } catch (error) {
    console.error(error);
  }
}

startServer(PORT);
