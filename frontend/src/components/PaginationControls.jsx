import { Pagination as AntPagination } from 'antd';

const PaginationControls = ({ 
  current, 
  pageSize, 
  total, 
  onChange,
  loading = false 
}) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      padding: '20px 0',
      background: '#fff',
      border: '1px solid #e8e8e8',
      borderTop: 'none',
      borderRadius: '0 0 8px 8px',
      marginTop: '-8px'
    }}>
      <AntPagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
        showSizeChanger={false}
        disabled={loading}
        showQuickJumper={false}
        simple={false}
      />
    </div>
  );
};

export default PaginationControls;
