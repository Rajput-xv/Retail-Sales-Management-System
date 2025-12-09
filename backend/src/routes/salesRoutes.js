import express from 'express';
import {
  getAllTransactions,
  getTransaction,
  getFilters,
  getStats
} from '../controllers/salesController.js';

const router = express.Router();

router.get('/transactions', getAllTransactions);

router.get('/transactions/:id', getTransaction);

router.get('/filters', getFilters);

router.get('/stats', getStats);

export default router;
