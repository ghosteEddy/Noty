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

const app: express.Express = express();

// middlewares
app.use(express.json());

const appHelmet = helmet();
app.use(appHelmet);
// for local react test
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

// app.use(isAuthorized);
// app.use(compression());

app.use('/check', healthCheckRouter);

app.use('/gas', gasRouter);

app.use(errorHandler);
// set port, listen for requests
app.listen(PORT, () => {
	console.info(`Server is running on port ${PORT}.`);
});
