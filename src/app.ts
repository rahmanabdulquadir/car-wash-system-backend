// import express, { Application, Request, Response } from 'express';
// import cors from 'cors';
// import router from './app/routes';
// import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import { notFound } from './app/middlewares/notFound';


// const app: Application = express();

// app.use(
//   cors({
//     origin: "*",
//   })
// );
// // parser
// app.use(express.json());
// app.use(cors());

// // application routes
// app.use('/api', router);

// app.get('/', (req: Request, res: Response) => {
//   res.send('Welcome to the car wash service system server.');
// });

// // Global Error Handler
// app.use(globalErrorHandler);

// // 404 Not Found route handler
// app.use(notFound);

// export default app;



import express from "express";
import router from "./app/routes";
import { notFound } from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import cors from 'cors';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
// app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello from server");
});
app.use("/api",router)
// 404 Handler
app.use(notFound);

/* eslint-disable @typescript-eslint/no-explicit-any */
app.use(globalErrorHandler);

export default app;
