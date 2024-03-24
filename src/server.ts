import express from "express";
import morgan from "morgan";
import cors from "cors";
import { PORT } from "./env";
import { connectToDB } from "./db";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

async function main() {
  try {
    // TODO: add db connection
    await connectToDB();
    app.listen(PORT);
    console.log("Server on port:", PORT);
  } catch (error) {
    console.log("Error. Connection to database lost");
    console.log(error);
  }
}
main();
