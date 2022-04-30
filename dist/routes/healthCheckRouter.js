"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const healthCheckController_1 = require("../controllers/healthCheckController");
const router = (0, express_1.Router)();
router.get('', healthCheckController_1.healthCheck);
router.get('/bcp', healthCheckController_1.bcpOilPriceCheck);
exports.default = router;
//# sourceMappingURL=healthCheckRouter.js.map