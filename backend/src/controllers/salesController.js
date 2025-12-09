import {
  getSalesTransactions,
  getTransactionById,
  getFilterOptions,
  getSalesStats
} from '../services/salesService.js';
import { formatResponse, formatError } from '../utils/responseFormatter.js';

const getAllTransactions = async (req, res, next) => {
  try {
    const { search, sortBy, page, pageSize } = req.query;

    const filters = {
      regions: req.query.regions ? (Array.isArray(req.query.regions) ? req.query.regions : [req.query.regions]) : [],
      genders: req.query.genders ? (Array.isArray(req.query.genders) ? req.query.genders : [req.query.genders]) : [],
      categories: req.query.categories ? (Array.isArray(req.query.categories) ? req.query.categories : [req.query.categories]) : [],
      tags: req.query.tags ? (Array.isArray(req.query.tags) ? req.query.tags : [req.query.tags]) : [],
      paymentMethods: req.query.paymentMethods ? (Array.isArray(req.query.paymentMethods) ? req.query.paymentMethods : [req.query.paymentMethods]) : [],
      ageMin: req.query.ageMin,
      ageMax: req.query.ageMax,
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo
    };

    const queryParams = {
      search,
      filters,
      sortBy: sortBy || 'date-desc',
      page: page || 1,
      pageSize: pageSize || 10
    };

    const result = await getSalesTransactions(queryParams);
    res.status(200).json(formatResponse(true, result, 'Transactions retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const getTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw formatError('Transaction ID is required', 400);
    }

    const transaction = await getTransactionById(id);

    if (!transaction) {
      throw formatError('Transaction not found', 404);
    }

    res.status(200).json(formatResponse(true, transaction, 'Transaction retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const getFilters = async (req, res, next) => {
  try {
    const filterOptions = await getFilterOptions();
    res.status(200).json(formatResponse(true, filterOptions, 'Filter options retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

const getStats = async (req, res, next) => {
  try {
    const stats = await getSalesStats();
    res.status(200).json(formatResponse(true, stats, 'Statistics retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

export {
  getAllTransactions,
  getTransaction,
  getFilters,
  getStats
};
