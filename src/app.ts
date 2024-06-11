import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();

app.use(express.json());
app.use(cors());

var a = 1;
console.log(a);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
