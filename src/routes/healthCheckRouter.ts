import { Router } from 'express';
import {bcpOilPriceCheck, healthCheck} from '../controllers/healthCheckController';

const router: Router = Router();
router.get('', healthCheck);
router.get('/bcp', bcpOilPriceCheck);

export default router;