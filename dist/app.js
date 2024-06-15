"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application routes
app.use("/api", routes_1.default);
app.get('/', (req, res) => {
    const a = 10;
    console.log(a);
    res.send('Welcome to the car wash service system server site.');
});
// Global Error Handler
app.use(globalErrorHandler_1.default);
// Not Found
app.use(notFound_1.default);
exports.default = app;
