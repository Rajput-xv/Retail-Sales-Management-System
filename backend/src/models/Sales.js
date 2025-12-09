import mongoose from 'mongoose';

const salesSchema = new mongoose.Schema({
  customerId: { type: String, required: true, index: true },
  customerName: { type: String, required: true, index: true },
  phoneNumber: { type: String, required: true, index: true },
  gender: { type: String, required: true, index: true },
  age: { type: Number, required: true, index: true },
  customerRegion: { type: String, required: true, index: true },
  customerType: { type: String, required: true },
  
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  brand: { type: String, required: true },
  productCategory: { type: String, required: true, index: true },
  tags: [{ type: String, index: true }],
  
  quantity: { type: Number, required: true },
  pricePerUnit: { type: Number, required: true },
  discountPercentage: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  finalAmount: { type: Number, required: true },
  
  date: { type: Date, required: true, index: true },
  paymentMethod: { type: String, required: true, index: true },
  orderStatus: { type: String, required: true },
  deliveryType: { type: String, required: true },
  
  storeId: { type: String, required: true },
  storeLocation: { type: String, required: true },
  salespersonId: { type: String, required: true },
  employeeName: { type: String, required: true }
}, {
  timestamps: true,
  collection: 'sales'
});

salesSchema.index({ customerName: 'text', phoneNumber: 'text' });

export default mongoose.model('Sales', salesSchema);
