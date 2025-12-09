import { Layout, Menu } from 'antd';
import { 
  DashboardOutlined, 
  ShoppingOutlined, 
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { useState } from 'react';

const { Sider } = Layout;

const Sidebar = ({ collapsed, onCollapse }) => {
  const [selectedKey, setSelectedKey] = useState('sales');

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'sales',
      icon: <ShoppingOutlined />,
      label: 'Sales',
    },
    {
      key: 'customers',
      icon: <UserOutlined />,
      label: 'Customers',
    },
    {
      key: 'invoices',
      icon: <FileTextOutlined />,
      label: 'Invoices',
    },
    {
      key: 'analytics',
      icon: <BarChartOutlined />,
      label: 'Analytics',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={200}
      style={{
        background: '#001529',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        overflow: 'auto',
        zIndex: 200
      }}
    >
      <div style={{
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '18px',
        fontWeight: 600,
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        {collapsed ? 'SM' : 'Sales Management'}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
        style={{ borderRight: 0, marginTop: '8px' }}
      />
    </Sider>
  );
};

export default Sidebar;
