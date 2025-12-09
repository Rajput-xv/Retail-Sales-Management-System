export const getStatusColor = (status) => {
  const statusColors = {
    'Completed': 'green',
    'Pending': 'orange',
    'Processing': 'blue',
    'Cancelled': 'red',
    'Shipped': 'cyan',
    'Delivered': 'green'
  };
  return statusColors[status] || 'default';
};

export const getPaymentMethodColor = (method) => {
  const methodColors = {
    'Credit Card': 'blue',
    'Debit Card': 'cyan',
    'Cash': 'green',
    'PayPal': 'purple',
    'Bank Transfer': 'orange'
  };
  return methodColors[method] || 'default';
};

export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const getInitials = (name) => {
  if (!name) return '';
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};
