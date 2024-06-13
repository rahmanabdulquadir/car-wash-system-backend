import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use("/api", router);

app.get('/', (req: Request, res: Response) => {
  const a = 10;
  console.log(a)
  res.send('Welcome to the car wash service system server site.');
});

// Global Error Handler
app.use(globalErrorHandler);

// Not Found
app.use(notFound);


export default app;
