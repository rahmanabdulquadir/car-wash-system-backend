"use strict";
// import express, { Application, Request, Response } from 'express';
// import cors from 'cors';
// import router from './app/routes';
// import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import { notFound } from './app/middlewares/notFound';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes"));
const notFound_1 = require("./app/middlewares/notFound");
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// app.use(morgan("dev"));
app.get("/", (req, res) => {
    res.send("Hello from server");
});
app.use("/api", routes_1.default);
// 404 Handler
app.use(notFound_1.notFound);
/* eslint-disable @typescript-eslint/no-explicit-any */
app.use(globalErrorHandler_1.default);
exports.default = app;
