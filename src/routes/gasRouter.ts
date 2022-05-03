import { Router } from 'express';
import Cgas from '../controllers/gasController';

const router: Router = Router();
router.get('/all', Cgas.getAllGas);
router.get('/prices', Cgas.getAllLatestGasPrice);

export default router;