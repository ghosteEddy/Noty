// 3rd party import
import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';

// internal import
// own middlewares import
import errorHandler from './middlewares/errorHandler';
// routers import
import healthCheckRouter from './routes/healthCheckRouter';
import gasRouter from './routes/gasRouter';

dotenv.config();
const PORT = process.env.PORT;

const app : express.Express = express();

// middlewares
app.use(express.json());

const appHelmet = helmet();
app.use(appHelmet);

// app.use(isAuthorized);
// app.use(compression());

app.use('/check', healthCheckRouter);

app.use('/gas', gasRouter);

app.use(errorHandler);
// set port, listen for requests
app.listen(PORT, () => {
	console.info(`Server is running on port ${PORT}.`);
});