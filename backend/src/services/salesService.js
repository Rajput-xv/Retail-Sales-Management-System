import Sales from '../models/Sales.js';
import { formatPaginatedResponse } from '../utils/responseFormatter.js';

const buildFilterQuery = (filters) => {
  const query = {};

  if (filters.regions && filters.regions.length > 0) {
    query.customerRegion = { $in: filters.regions };
  }

  if (filters.genders && filters.genders.length > 0) {
    query.gender = { $in: filters.genders };
  }

  if (filters.categories && filters.categories.length > 0) {
    query.productCategory = { $in: filters.categories };
  }

  if (filters.tags && filters.tags.length > 0) {
    query.tags = { $in: filters.tags };
  }

  if (filters.paymentMethods && filters.paymentMethods.length > 0) {
    query.paymentMethod = { $in: filters.paymentMethods };
  }

  if (filters.ageMin !== undefined || filters.ageMax !== undefined) {
    query.age = {};
    if (filters.ageMin !== undefined) {
      query.age.$gte = parseInt(filters.ageMin);
    }
    if (filters.ageMax !== undefined) {
      query.age.$lte = parseInt(filters.ageMax);
    }
  }

  if (filters.dateFrom || filters.dateTo) {
    query.date = {};
    if (filters.dateFrom) {
      query.date.$gte = new Date(filters.dateFrom);
    }
    if (filters.dateTo) {
      const endDate = new Date(filters.dateTo);
      endDate.setHours(23, 59, 59, 999);
      query.date.$lte = endDate;
    }
  }

  return query;
};

const buildSearchQuery = (searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return {};
  }

  const trimmedSearch = searchTerm.trim();
  const searchRegex = new RegExp(trimmedSearch, 'i');

  return {
    $or: [
      { customerName: searchRegex },
      { phoneNumber: searchRegex }
    ]
  };
};

const buildSortQuery = (sortBy) => {
  const sortOptions = {
    'date-desc': { date: -1 },
    'date-asc': { date: 1 },
    'quantity-desc': { quantity: -1 },
    'quantity-asc': { quantity: 1 },
    'name-asc': { customerName: 1 },
    'name-desc': { customerName: -1 }
  };

  return sortOptions[sortBy] || { date: -1 };
};

const getSalesTransactions = async (queryParams) => {
  try {
    const {
      search = '',
      filters = {},
      sortBy = 'date-desc',
      page = 1,
      pageSize = 10
    } = queryParams;

    const filterQuery = buildFilterQuery(filters);
    const searchQuery = buildSearchQuery(search);

    const combinedQuery = {
      ...filterQuery,
      ...searchQuery
    };

    const sortQuery = buildSortQuery(sortBy);
    const skip = (parseInt(page) - 1) * parseInt(pageSize);
    const limit = parseInt(pageSize);

    const [transactions, total] = await Promise.all([
      Sales.find(combinedQuery)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .lean(),
      Sales.countDocuments(combinedQuery)
    ]);

    return formatPaginatedResponse(transactions, total, page, pageSize);
  } catch (error) {
    console.error('Error fetching sales transactions:', error);
    throw error;
  }
};

const getTransactionById = async (id) => {
  try {
    const transaction = await Sales.findById(id).lean();
    return transaction;
  } catch (error) {
    console.error('Error fetching transaction by ID:', error);
    throw error;
  }
};

const getFilterOptions = async () => {
  try {
    const [regions, genders, categories, tags, paymentMethods, ageStats] = await Promise.all([
      Sales.distinct('customerRegion'),
      Sales.distinct('gender'),
      Sales.distinct('productCategory'),
      Sales.distinct('tags'),
      Sales.distinct('paymentMethod'),
      Sales.aggregate([
        {
          $group: {
            _id: null,
            minAge: { $min: '$age' },
            maxAge: { $max: '$age' }
          }
        }
      ])
    ]);

    return {
      regions: regions.filter(v => v).sort(),
      genders: genders.filter(v => v).sort(),
      categories: categories.filter(v => v).sort(),
      tags: tags.filter(v => v).sort(),
      paymentMethods: paymentMethods.filter(v => v).sort(),
      ageRange: ageStats.length > 0 ? {
        min: ageStats[0].minAge,
        max: ageStats[0].maxAge
      } : { min: 0, max: 100 }
    };
  } catch (error) {
    console.error('Error fetching filter options:', error);
    throw error;
  }
};

const getSalesStats = async () => {
  try {
    const stats = await Sales.aggregate([
      {
        $group: {
          _id: null,
          totalTransactions: { $sum: 1 },
          totalRevenue: { $sum: '$finalAmount' },
          averageOrderValue: { $avg: '$finalAmount' },
          totalQuantitySold: { $sum: '$quantity' }
        }
      }
    ]);

    return stats.length > 0 ? stats[0] : {
      totalTransactions: 0,
      totalRevenue: 0,
      averageOrderValue: 0,
      totalQuantitySold: 0
    };
  } catch (error) {
    console.error('Error fetching sales stats:', error);
    throw error;
  }
};

export {
  getSalesTransactions,
  getTransactionById,
  getFilterOptions,
  getSalesStats
};
