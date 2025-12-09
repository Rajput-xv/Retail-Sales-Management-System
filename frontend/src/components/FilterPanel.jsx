import { Select, DatePicker, Slider, Button, Row, Col, Space } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const FilterPanel = ({ filterOptions, filters, onFilterChange, onReset, loading = false }) => {
  const handleMultiSelectChange = (field, values) => {
    onFilterChange({ [field]: values });
  };

  const handleAgeRangeChange = (values) => {
    onFilterChange({
      ageMin: values[0],
      ageMax: values[1]
    });
  };

  // Handle multi-select age range
  const handleAgeRangeMultiSelect = (selectedRanges) => {
    if (!selectedRanges || selectedRanges.length === 0) {
      onFilterChange({
        ageMin: undefined,
        ageMax: undefined
      });
      return;
    }

    // Parse all selected ranges and find the overall min and max
    const ranges = selectedRanges.map(range => {
      const [min, max] = range.split('-').map(v => v === '+' ? 100 : parseInt(v));
      return { min, max };
    });

    const overallMin = Math.min(...ranges.map(r => r.min));
    const overallMax = Math.max(...ranges.map(r => r.max));

    onFilterChange({
      ageMin: overallMin,
      ageMax: overallMax
    });
  };

  // Convert current ageMin/ageMax to selected ranges
  const getSelectedAgeRanges = () => {
    if (filters.ageMin === undefined && filters.ageMax === undefined) {
      return [];
    }

    const ranges = [];
    const { ageMin, ageMax } = filters;

    // Check which predefined ranges fall within the selected min/max
    if (ageMin <= 18 && ageMax >= 25) ranges.push('18-25');
    if (ageMin <= 26 && ageMax >= 35) ranges.push('26-35');
    if (ageMin <= 36 && ageMax >= 50) ranges.push('36-50');
    if (ageMin <= 50 && ageMax >= 100) ranges.push('50+');

    return ranges;
  };

  const handleDateRangeChange = (dates) => {
    if (dates && dates.length === 2) {
      onFilterChange({
        dateFrom: dates[0].format('YYYY-MM-DD'),
        dateTo: dates[1].format('YYYY-MM-DD')
      });
    } else {
      onFilterChange({
        dateFrom: null,
        dateTo: null
      });
    }
  };

  const dateRange = filters.dateFrom && filters.dateTo
    ? [dayjs(filters.dateFrom), dayjs(filters.dateTo)]
    : null;

  const ageRange = [
    filters.ageMin ?? filterOptions.ageRange?.min ?? 0,
    filters.ageMax ?? filterOptions.ageRange?.max ?? 100
  ];

  const hasActiveFilters = 
    filters.regions?.length > 0 ||
    filters.genders?.length > 0 ||
    filters.categories?.length > 0 ||
    filters.tags?.length > 0 ||
    filters.paymentMethods?.length > 0 ||
    filters.dateFrom ||
    filters.ageMin !== undefined;

  return (
    <>
      <div style={{ display: 'flex', gap: '8px', flex: 1, flexWrap: 'nowrap', alignItems: 'center' }}>
        <Select
          mode="multiple"
          placeholder="Customer Region"
          value={filters.regions}
          onChange={(values) => handleMultiSelectChange('regions', values)}
          options={filterOptions.regions?.map(region => ({
            label: region,
            value: region
          }))}
          style={{ minWidth: 155, width: 'auto', maxWidth: 250, background: '#fff' }}
          size="small"
          maxTagCount="responsive"
          disabled={loading}
          allowClear
        />

        <Select
          mode="multiple"
          placeholder="Gender"
          value={filters.genders}
          onChange={(values) => handleMultiSelectChange('genders', values)}
          options={filterOptions.genders?.map(gender => ({
            label: gender,
            value: gender
          }))}
          style={{ minWidth: 95, width: 'auto', maxWidth: 180, background: '#fff' }}
          size="small"
          maxTagCount="responsive"
          disabled={loading}
          allowClear
        />

        <Select
          mode="multiple"
          placeholder="Age Range"
          value={getSelectedAgeRanges()}
          onChange={handleAgeRangeMultiSelect}
          options={[
            { label: '18-25', value: '18-25' },
            { label: '26-35', value: '26-35' },
            { label: '36-50', value: '36-50' },
            { label: '50+', value: '50+' }
          ]}
          style={{ minWidth: 115, width: 'auto', maxWidth: 200, background: '#fff' }}
          size="small"
          maxTagCount="responsive"
          disabled={loading}
          allowClear
        />

        <Select
          mode="multiple"
          placeholder="Product Category"
          value={filters.categories}
          onChange={(values) => handleMultiSelectChange('categories', values)}
          options={filterOptions.categories?.map(category => ({
            label: category,
            value: category
          }))}
          style={{ minWidth: 160, width: 'auto', maxWidth: 250, background: '#fff' }}
          size="small"
          maxTagCount="responsive"
          disabled={loading}
          allowClear
        />

        <Select
          mode="multiple"
          placeholder="Tags"
          value={filters.tags}
          onChange={(values) => handleMultiSelectChange('tags', values)}
          options={filterOptions.tags?.map(tag => ({
            label: tag,
            value: tag
          }))}
          style={{ minWidth: 75, width: 'auto', maxWidth: 180, background: '#fff' }}
          size="small"
          maxTagCount="responsive"
          disabled={loading}
          allowClear
        />

        <Select
          mode="multiple"
          placeholder="Payment Method"
          value={filters.paymentMethods}
          onChange={(values) => handleMultiSelectChange('paymentMethods', values)}
          options={filterOptions.paymentMethods?.map(method => ({
            label: method,
            value: method
          }))}
          style={{ minWidth: 155, width: 'auto', maxWidth: 220, background: '#fff' }}
          size="small"
          maxTagCount="responsive"
          disabled={loading}
          allowClear
        />

        <RangePicker
          value={dateRange}
          onChange={handleDateRangeChange}
          style={{ width: 'auto', background: '#fff' }}
          size="small"
          format="YYYY-MM-DD"
          disabled={loading}
          allowClear
          placeholder={['Date', 'Date']}
        />
      </div>
    </>
  );
};

export default FilterPanel;
