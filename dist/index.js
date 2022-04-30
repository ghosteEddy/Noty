"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 3rd party import
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
// internal import
// own middlewares import
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
// routers import
const healthCheckRouter_1 = __importDefault(require("./routes/healthCheckRouter"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
const appHelmet = (0, helmet_1.default)();
app.use(appHelmet);
// app.use(isAuthorized);
// app.use(compression());
app.use('/check', healthCheckRouter_1.default);
app.use(errorHandler_1.default);
// set port, listen for requests
app.listen(PORT, () => {
    console.info(`Server is running on port ${PORT}.`);
});
//# sourceMappingURL=index.js.map