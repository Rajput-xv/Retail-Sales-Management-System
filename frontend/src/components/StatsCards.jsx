import { Row, Col, Card } from 'antd';
import { 
  DollarOutlined, 
  ShoppingCartOutlined, 
  FileTextOutlined,
  RiseOutlined 
} from '@ant-design/icons';
import { formatCurrency, formatNumber } from '../utils/formatters';

const StatsCards = ({ stats, loading }) => {
  const statsData = [
    {
      title: 'Total units sold',
      value: stats?.totalQuantitySold || 0,
      formatter: formatNumber,
      icon: <ShoppingCartOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
      color: '#e6f7ff'
    },
    {
      title: 'Total Amount',
      value: stats?.totalRevenue || 0,
      formatter: (val) => `₹ ${val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: <DollarOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
      color: '#f6ffed'
    },
    {
      title: 'Total Transactions',
      value: stats?.totalTransactions || 0,
      formatter: formatNumber,
      icon: <FileTextOutlined style={{ fontSize: '24px', color: '#722ed1' }} />,
      color: '#f9f0ff'
    }
  ];

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
      {statsData.map((stat, index) => (
        <Col xs={24} sm={12} md={6} key={index}>
          <Card 
            className="stats-card"
            loading={loading}
            bordered={false}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <div className="stats-label">{stat.title}</div>
                <div className="stats-value">{stat.formatter(stat.value)}</div>
              </div>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '8px', 
                background: stat.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {stat.icon}
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default StatsCards;
