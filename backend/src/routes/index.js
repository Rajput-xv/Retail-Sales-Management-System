import express from 'express';
import salesRoutes from './salesRoutes.js';

const router = express.Router();

router.use('/sales', salesRoutes);

export default router;
