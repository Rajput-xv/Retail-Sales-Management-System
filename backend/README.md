# Retail Sales Management System - Backend

Backend API for managing retail sales operations with advanced search, filtering, sorting, and pagination capabilities.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- CSV Parser

## Setup Instructions

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Setup MongoDB:
   - Update `.env` file with your MongoDB connection string

4. Place CSV file:
   - Download the sales_data.csv file
   - Place it in the `backend/data/` directory

5. Start development server:
```bash
npm run dev
```

6. Server will run on http://localhost:5000
   - API endpoints: http://localhost:5000/api
   - Health check: http://localhost:5000/health

## API Endpoints

- `GET /api/sales/transactions` - Get all transactions with filters
- `GET /api/sales/transactions/:id` - Get single transaction
- `GET /api/sales/filters` - Get available filter options
- `GET /api/sales/stats` - Get dashboard statistics