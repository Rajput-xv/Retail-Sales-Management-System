import { useState, useEffect } from 'react';
import { salesService } from '../services/salesService';

export const useSalesData = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0
  });

  const [filters, setFilters] = useState({
    regions: [],
    genders: [],
    categories: [],
    tags: [],
    paymentMethods: [],
    ageMin: undefined,
    ageMax: undefined,
    dateFrom: null,
    dateTo: null
  });

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await salesService.getTransactions({
        search,
        filters,
        sortBy,
        page: pagination.page,
        pageSize: pagination.pageSize
      });

      if (response.success) {
        setTransactions(response.data.items);
        setPagination(prev => ({
          ...prev,
          total: response.data.total,
          totalPages: response.data.totalPages
        }));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTransactions();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, filters, sortBy, pagination.page, pagination.pageSize]);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const updateSearch = (searchTerm) => {
    setSearch(searchTerm);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const updateSort = (sortOption) => {
    setSortBy(sortOption);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const changePage = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const changePageSize = (newPageSize) => {
    setPagination(prev => ({ ...prev, pageSize: newPageSize, page: 1 }));
  };

  const resetFilters = () => {
    setFilters({
      regions: [],
      genders: [],
      categories: [],
      tags: [],
      paymentMethods: [],
      ageMin: undefined,
      ageMax: undefined,
      dateFrom: null,
      dateTo: null
    });
    setSearch('');
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  return {
    transactions,
    loading,
    error,
    pagination,
    filters,
    search,
    sortBy,
    updateFilters,
    updateSearch,
    updateSort,
    changePage,
    changePageSize,
    resetFilters,
    refetch: fetchTransactions
  };
};
