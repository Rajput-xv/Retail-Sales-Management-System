import { Layout } from 'antd';
import { useState } from 'react';

const { Header, Content } = Layout;

const SalesPage = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        background: '#fff', 
        borderBottom: '1px solid #f0f0f0',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: '20px', 
          fontWeight: 600,
          color: '#262626'
        }}>
          Retail Sales Management
        </h1>
      </Header>
      <Content style={{ 
        padding: '24px',
        background: '#f5f5f5'
      }}>
        <div style={{ 
          background: '#fff',
          padding: '24px',
          borderRadius: '8px',
          minHeight: 'calc(100vh - 112px)'
        }}>
          {loading ? 'Loading...' : 'Sales Dashboard'}
        </div>
      </Content>
    </Layout>
  );
};

export default SalesPage;
