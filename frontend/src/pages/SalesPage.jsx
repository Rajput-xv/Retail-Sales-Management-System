import { Layout, Spin, Alert, Empty, Select, Input, Button } from 'antd';
import { InboxOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import FilterPanel from '../components/FilterPanel';
import SalesTable from '../components/SalesTable';
import PaginationControls from '../components/PaginationControls';
import { useSalesData } from '../hooks/useSalesData';
import { useFilterOptions } from '../hooks/useFilterOptions';
import { salesService } from '../services/salesService';

const { Header, Content } = Layout;

const SalesPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('name-asc');
  const [searchValue, setSearchValue] = useState('');

  const {
    transactions,
    loading,
    error,
    pagination,
    filters,
    updateFilters,
    updateSearch,
    updateSort,
    changePage,
    resetFilters
  } = useSalesData();

  const { filterOptions, loading: filterLoading } = useFilterOptions();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStatsLoading(true);
        const response = await salesService.getStats();
        if (response.success) {
          setStats(response.data);
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    updateSearch(value);
  };

  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    updateSort(value);
  };

  const handlePageChange = (page) => {
    changePage(page);
  };

  const handleResetFilters = () => {
    setSearchValue('');
    resetFilters();
  };

  const sortOptions = [
    { label: 'Customer Name (A-Z)', value: 'name-asc' },
    { label: 'Customer Name (Z-A)', value: 'name-desc' },
    { label: 'Date (Newest)', value: 'date-desc' },
    { label: 'Date (Oldest)', value: 'date-asc' },
    { label: 'Amount (High to Low)', value: 'amount-desc' },
    { label: 'Amount (Low to High)', value: 'amount-asc' },
    { label: 'Quantity (High)', value: 'quantity-desc' },
    { label: 'Quantity (Low)', value: 'quantity-asc' }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s' }}>
        <Header style={{ 
          background: '#fff', 
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #f0f0f0',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <h1 style={{ 
            margin: 0, 
            fontSize: '20px', 
            fontWeight: 600,
            color: '#262626'
          }}>
            Sales Management System
          </h1>
          <Input
            placeholder="Name, Phone no."
            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
            value={searchValue}
            onChange={handleSearchChange}
            allowClear
            style={{ width: 300 }}
          />
        </Header>

        <Content style={{ 
          padding: '20px',
          background: '#f5f5f5',
          minHeight: 'calc(100vh - 64px)'
        }}>
          {/* Top strip with filters and sort */}
          <div style={{ 
            background: '#fafafa',
            padding: '12px 16px',
            borderRadius: '8px 8px 0 0',
            marginBottom: '0',
            border: '1px solid #e8e8e8',
            borderBottom: 'none'
          }}>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              <Button 
                size="small" 
                icon={<ReloadOutlined />} 
                onClick={() => window.location.reload()} 
                style={{ 
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#fff'
                }}
              />
              <FilterPanel
                filterOptions={filterOptions}
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
                loading={loading || filterLoading}
              />
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', color: '#8c8c8c', fontWeight: 400 }}>Sort by:</span>
                <Select
                  value={sortBy}
                  onChange={handleSortChange}
                  options={sortOptions}
                  style={{ width: 200 }}
                  size="small"
                  bordered={true}
                />
              </div>
            </div>
          </div>

          {/* Stats chips below filters */}
          <div style={{ 
            background: '#fff',
            padding: '12px 16px',
            marginBottom: '0',
            border: '1px solid #e8e8e8',
            borderTop: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{ 
              border: '1px solid #e8e8e8', 
              borderRadius: 8, 
              padding: '10px 16px', 
              background: '#fafafa',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ fontSize: 12, color: '#8c8c8c', fontWeight: 400 }}>Total units sold</div>
                <div style={{ 
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: '#e8e8e8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  color: '#8c8c8c',
                  cursor: 'help'
                }}>ⓘ</div>
              </div>
              <div style={{ fontWeight: 600, fontSize: 16, color: '#262626' }}>
                {statsLoading ? '-' : (stats?.totalQuantitySold || 0)}
              </div>
            </div>

            <div style={{ 
              border: '1px solid #e8e8e8', 
              borderRadius: 8, 
              padding: '10px 16px', 
              background: '#fafafa',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ fontSize: 12, color: '#8c8c8c', fontWeight: 400 }}>Total Amount</div>
                <div style={{ 
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: '#e8e8e8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  color: '#8c8c8c',
                  cursor: 'help'
                }}>ⓘ</div>
              </div>
              <div style={{ fontWeight: 600, fontSize: 16, color: '#262626' }}>
                {statsLoading ? '-' : `₹${(stats?.totalRevenue || 0).toLocaleString('en-IN')}`} <span style={{ color: '#8c8c8c', fontWeight: 400, fontSize: 13 }}>({stats?.totalTransactions || 0} SRs)</span>
              </div>
            </div>

            <div style={{ 
              border: '1px solid #e8e8e8', 
              borderRadius: 8, 
              padding: '10px 16px', 
              background: '#fafafa',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ fontSize: 12, color: '#8c8c8c', fontWeight: 400 }}>Total Discount</div>
                <div style={{ 
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: '#e8e8e8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '9px',
                  color: '#8c8c8c',
                  cursor: 'help'
                }}>ⓘ</div>
              </div>
              <div style={{ fontWeight: 600, fontSize: 16, color: '#262626' }}>
                {statsLoading ? '-' : `₹${(stats?.totalDiscount || 0).toLocaleString('en-IN')}`} <span style={{ color: '#8c8c8c', fontWeight: 400, fontSize: 13 }}>({stats?.totalTransactions || 0} SRs)</span>
              </div>
            </div>
          </div>

          {error && (
            <Alert
              message="Error"
              description={error}
              type="error"
              closable
              style={{ marginBottom: '16px' }}
            />
          )}

          {/* connected table and pagination below */}

          {loading && !transactions.length ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '100px 0',
              background: '#fff',
              borderRadius: '8px'
            }}>
              <Spin size="large" tip="Loading transactions..." />
            </div>
          ) : transactions.length === 0 ? (
            <div style={{ 
              background: '#fff', 
              borderRadius: '8px', 
              padding: '60px',
              textAlign: 'center'
            }}>
              <Empty
                image={<InboxOutlined style={{ fontSize: '64px', color: '#d9d9d9' }} />}
                description={
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 500, color: '#595959', marginBottom: '8px' }}>
                      No transactions found
                    </div>
                    <div style={{ fontSize: '14px', color: '#8c8c8c' }}>
                      Try adjusting your search or filters
                    </div>
                  </div>
                }
              />
            </div>
          ) : (
            <>
              <SalesTable
                data={transactions}
                loading={loading}
              />

              <PaginationControls
                current={pagination.page}
                pageSize={pagination.pageSize}
                total={pagination.total}
                onChange={handlePageChange}
                loading={loading}
              />
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SalesPage;
