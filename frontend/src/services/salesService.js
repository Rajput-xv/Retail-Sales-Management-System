import apiClient from './apiClient';

export const salesService = {
  getTransactions: async (params) => {
    const queryParams = new URLSearchParams();
    
    if (params.search) {
      queryParams.append('search', params.search);
    }
    
    if (params.sortBy) {
      queryParams.append('sortBy', params.sortBy);
    }
    
    if (params.page) {
      queryParams.append('page', params.page);
    }
    
    if (params.pageSize) {
      queryParams.append('pageSize', params.pageSize);
    }
    
    if (params.filters) {
      if (params.filters.regions?.length > 0) {
        params.filters.regions.forEach(region => {
          queryParams.append('regions', region);
        });
      }
      
      if (params.filters.genders?.length > 0) {
        params.filters.genders.forEach(gender => {
          queryParams.append('genders', gender);
        });
      }
      
      if (params.filters.categories?.length > 0) {
        params.filters.categories.forEach(category => {
          queryParams.append('categories', category);
        });
      }
      
      if (params.filters.tags?.length > 0) {
        params.filters.tags.forEach(tag => {
          queryParams.append('tags', tag);
        });
      }
      
      if (params.filters.paymentMethods?.length > 0) {
        params.filters.paymentMethods.forEach(method => {
          queryParams.append('paymentMethods', method);
        });
      }
      
      if (params.filters.ageMin !== undefined) {
        queryParams.append('ageMin', params.filters.ageMin);
      }
      
      if (params.filters.ageMax !== undefined) {
        queryParams.append('ageMax', params.filters.ageMax);
      }
      
      if (params.filters.dateFrom) {
        queryParams.append('dateFrom', params.filters.dateFrom);
      }
      
      if (params.filters.dateTo) {
        queryParams.append('dateTo', params.filters.dateTo);
      }
    }
    
    const response = await apiClient.get(`/sales/transactions?${queryParams.toString()}`);
    return response;
  },

  getTransactionById: async (id) => {
    const response = await apiClient.get(`/sales/transactions/${id}`);
    return response;
  },

  getFilterOptions: async () => {
    const response = await apiClient.get('/sales/filters');
    return response;
  },

  getStats: async () => {
    const response = await apiClient.get('/sales/stats');
    return response;
  }
};
