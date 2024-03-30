import "express-async-errors";
import express, { Response, type Request, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import { PORT } from "./env";
import { connectToDB } from "./db";
import userRoutes from "./routes/user.routes";
import projectRoutes from "./routes/project.routes";
import { notFoundHandler } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/error";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/user", userRoutes);
app.use("/project", projectRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

async function main() {
  try {
    await connectToDB();
    app.listen(PORT);
    console.log("Server on port:", PORT);
  } catch (error) {
    console.log("Error. Connection to database lost");
    console.log(error);
  }
}
main();
