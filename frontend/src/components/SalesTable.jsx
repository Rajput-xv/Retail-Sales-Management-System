import { Table, Tag } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { formatDate } from '../utils/dateUtils';
import { message } from 'antd';

const SalesTable = ({ 
  data, 
  loading
}) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    message.success('Copied to clipboard');
  };

  const columns = [
    {
      title: 'Transaction ID',
      dataIndex: '_id',
      key: '_id',
      width: 110,
      render: (id) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '13px' }}>{id?.slice(-7)}</span>
        </div>
      )
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 100,
      render: (date) => <span style={{ fontSize: '13px' }}>{formatDate(date)}</span>
    },
    {
      title: 'Customer ID',
      dataIndex: 'customerId',
      key: 'customerId',
      width: 110,
      render: (id) => <span style={{ fontSize: '13px' }}>{id}</span>
    },
    {
      title: 'Customer name',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 130,
      render: (name) => <span style={{ fontSize: '13px' }}>{name}</span>
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 140,
      render: (phone) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '13px' }}>{phone}</span>
          <CopyOutlined 
            style={{ fontSize: '12px', color: '#1890ff', cursor: 'pointer' }}
            onClick={() => copyToClipboard(phone)}
          />
        </div>
      )
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 80,
      render: (gender) => <span style={{ fontSize: '13px' }}>{gender}</span>
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 60,
      align: 'center',
      render: (age) => <span style={{ fontSize: '13px' }}>{age}</span>
    },
    {
      title: 'Product Category',
      dataIndex: 'productCategory',
      key: 'productCategory',
      width: 130,
      render: (category) => <span style={{ fontSize: '13px' }}>{category}</span>
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 80,
      align: 'center',
      render: (qty) => <span style={{ fontSize: '13px' }}>{qty}</span>
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: 110,
      align: 'right',
      render: (amount) => <span style={{ fontSize: '13px' }}>₹{amount?.toLocaleString('en-IN')}</span>
    },
    {
      title: 'Customer region',
      dataIndex: 'customerRegion',
      key: 'customerRegion',
      width: 130,
      render: (region) => <span style={{ fontSize: '13px' }}>{region}</span>
    },
    {
      title: 'Product ID',
      dataIndex: 'productId',
      key: 'productId',
      width: 100,
      render: (id) => <span style={{ fontSize: '13px' }}>{id}</span>
    },
    {
      title: 'Employee name',
      dataIndex: 'employeeName',
      key: 'employeeName',
      width: 130,
      render: (name) => <span style={{ fontSize: '13px' }}>{name}</span>
    }
  ];

  return (
    <div style={{ 
      background: '#fff',
      border: '1px solid #e8e8e8',
      borderTop: 'none',
      borderRadius: '0 0 8px 8px'
    }}>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="_id"
        pagination={false}
        scroll={{ x: 1600 }}
        size="middle"
        bordered={false}
      />
    </div>
  );
};

export default SalesTable;
