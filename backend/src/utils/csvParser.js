

const transformCSVRecord = (record) => {
  const parseDate = (dateStr) => {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const month = parseInt(parts[0]) - 1;
      const day = parseInt(parts[1]);
      const year = parseInt(parts[2]);
      return new Date(year, month, day);
    }
    return new Date(dateStr);
  };

  const parseTags = (tagStr) => {
    if (!tagStr || tagStr.trim() === '') return [];
    return tagStr.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
  };

  return {
    customerId: record['Customer ID'] || record.customerId,
    customerName: record['Customer Name'] || record.customerName,
    phoneNumber: record['Phone Number'] || record.phoneNumber,
    gender: record['Gender'] || record.gender,
    age: parseInt(record['Age'] || record.age) || 0,
    customerRegion: record['Customer Region'] || record.customerRegion,
    customerType: record['Customer Type'] || record.customerType,
    
    productId: record['Product ID'] || record.productId,
    productName: record['Product Name'] || record.productName,
    brand: record['Brand'] || record.brand,
    productCategory: record['Product Category'] || record.productCategory,
    tags: parseTags(record['Tags'] || record.tags),
    
    quantity: parseInt(record['Quantity'] || record.quantity) || 0,
    pricePerUnit: parseFloat(record['Price per Unit'] || record.pricePerUnit) || 0,
    discountPercentage: parseFloat(record['Discount Percentage'] || record.discountPercentage) || 0,
    totalAmount: parseFloat(record['Total Amount'] || record.totalAmount) || 0,
    finalAmount: parseFloat(record['Final Amount'] || record.finalAmount) || 0,
    
    date: parseDate(record['Date'] || record.date),
    paymentMethod: record['Payment Method'] || record.paymentMethod,
    orderStatus: record['Order Status'] || record.orderStatus,
    deliveryType: record['Delivery Type'] || record.deliveryType,
    
    storeId: record['Store ID'] || record.storeId,
    storeLocation: record['Store Location'] || record.storeLocation,
    salespersonId: record['Salesperson ID'] || record.salespersonId,
    employeeName: record['Employee Name'] || record.employeeName
  };
};

const validateRecord = (record) => {
  const requiredFields = [
    'customerId', 'customerName', 'phoneNumber', 'gender', 'age',
    'customerRegion', 'productId', 'productName', 'productCategory',
    'quantity', 'pricePerUnit', 'date', 'paymentMethod'
  ];

  for (const field of requiredFields) {
    if (!record[field] && record[field] !== 0) {
      return false;
    }
  }

  return true;
};

export { transformCSVRecord, validateRecord };
