import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = 'Search by customer name or phone number...', loading = false }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <div style={{ marginBottom: '24px' }}>
      <Input
        size="large"
        placeholder={placeholder}
        prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
        value={searchValue}
        onChange={handleChange}
        allowClear
        onClear={handleClear}
        disabled={loading}
        style={{
          borderRadius: '8px',
          fontSize: '14px'
        }}
      />
    </div>
  );
};

export default SearchBar;
