import { useState, useEffect } from 'react';
import { salesService } from '../services/salesService';

export const useFilterOptions = () => {
  const [filterOptions, setFilterOptions] = useState({
    regions: [],
    genders: [],
    categories: [],
    tags: [],
    paymentMethods: [],
    ageRange: { min: 0, max: 100 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setLoading(true);
        const response = await salesService.getFilterOptions();
        
        if (response.success) {
          setFilterOptions(response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  return { filterOptions, loading, error };
};
