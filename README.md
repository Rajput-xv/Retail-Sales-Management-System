# Retail Sales Management System

A full-stack web application for managing and analyzing retail sales data with advanced filtering, search and analytics capabilities.

## 🎯 Overview

The Retail Sales Management System is a comprehensive solution designed to handle large-scale sales transaction data. It provides an intuitive interface for viewing, searching, filtering, and analyzing sales records with real-time statistics and multi-dimensional filtering capabilities.

### Key Highlights

- **Real-time Data Processing**: Efficient CSV data parsing and in-memory processing
- **Advanced Search**: Multi-field search across transaction IDs, customer names, and products
- **Multi-dimensional Filtering**: Filter by region, gender, category, age, date range, payment method, and tags
- **Dynamic Sorting**: Sort by date, amount, quantity, age, or product name
- **Responsive Design**: Mobile-first UI built with Ant Design
- **RESTful API**: Clean, scalable backend architecture
- **MongoDB Integration**: Persistent data storage with Mongoose ODM

## ✨ Features

### Backend Features

- **CSV Data Import**: Automatic loading and parsing of sales data from CSV files
- **Advanced Filtering**: Multi-parameter filtering with logical AND operations
- **Search Functionality**: Case-insensitive search across multiple fields
- **Pagination**: Server-side pagination for optimal performance
- **Sorting**: Flexible sorting by multiple fields (ascending/descending)
- **Statistics API**: Real-time calculation of sales metrics and aggregations
- **Error Handling**: Comprehensive error handling and validation
- **CORS Enabled**: Cross-origin resource sharing for frontend integration

### Frontend Features

- **Interactive Dashboard**: Clean and intuitive user interface
- **Real-time Statistics Cards**: Display total revenue, transactions, and averages
- **Advanced Filter Panel**: Collapsible multi-select filters with dynamic options
- **Search Bar**: Debounced search for optimal performance
- **Responsive Table**: Mobile-friendly data table with expandable rows
- **Pagination Controls**: Navigate through large datasets efficiently
- **Loading States**: Skeleton loaders for better UX
- **Dark Theme Ready**: Theme configuration support

## 🛠️ Technology Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | Latest | Runtime environment |
| Express.js | ^5.2.1 | Web framework |
| MongoDB | Latest | Database |
| Mongoose | ^8.0.3 | ODM for MongoDB |
| CSV Parse | ^6.1.0 | CSV file parsing |
| CORS | ^2.8.5 | Cross-origin resource sharing |
| dotenv | ^17.2.3 | Environment variable management |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | ^19.2.1 | UI framework |
| Vite | ^7.2.7 | Build tool and dev server |
| Ant Design | ^6.1.0 | UI component library |
| React Router | ^7.10.1 | Client-side routing |
| Axios | ^1.13.2 | HTTP client |
| Day.js | ^1.11.10 | Date manipulation |

## 🏗️ Architecture

### System Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│  React Frontend │ ◄─────► │  Express API    │ ◄─────► │    MongoDB      │
│   (Port 5173)   │  HTTP   │  (Port 5000)    │         │   Database      │
│                 │         │                 │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
                                     │
                                     ▼
                            ┌─────────────────┐
                            │   CSV Data      │
                            │   Loader        │
                            └─────────────────┘
```

### Backend Architecture Layers

1. **Routes Layer**: API endpoint definitions and routing
2. **Controllers Layer**: Request handling and response formatting
3. **Services Layer**: Business logic and data processing
4. **Models Layer**: Data schemas and validation
5. **Utils Layer**: Helper functions and utilities

### Frontend Architecture

1. **Pages**: Top-level page components
2. **Components**: Reusable UI components
3. **Hooks**: Custom React hooks for state and effects
4. **Services**: API integration layer
5. **Utils**: Helper functions and utilities

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Rajput-xv/Retail-Sales-Management-System.git
cd Retail-Sales-Management-System
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Configuration

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/retail_sales
```

### Frontend Configuration

Create a `.env` file in the `frontend` directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
```

### Data Setup

Ensure the sales data CSV file is located at:
```
backend/data/sales_data.csv
```

The CSV file should have the following columns:
- Transaction ID
- Date
- Customer ID
- Gender
- Age
- Product Category
- Quantity
- Price per Unit
- Total Amount
- Payment Method
- Store Location (Region)
- Product Name
- Tags

## 🎮 Running the Application

### Start Backend Server

```bash
cd backend
npm start
```

The backend server will start on `http://localhost:5000`

For development with auto-reload:
```bash
npm run dev
```

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:3000`

### Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## 📡 API Documentation

### Base URL

```
http://localhost:5000/api
```

## 📁 Project Structure

```
Retail-Sales-Management-System/
│
├── backend/                      # Backend application
│   ├── data/                     # Data files
│   │   └── sales_data.csv       # Sales transactions CSV
│   ├── src/
│   │   ├── controllers/         # Request handlers
│   │   │   └── salesController.js
│   │   ├── models/              # Data models
│   │   │   └── Sales.js
│   │   ├── routes/              # API routes
│   │   │   ├── index.js
│   │   │   └── salesRoutes.js
│   │   ├── services/            # Business logic
│   │   │   └── salesService.js
│   │   ├── utils/               # Helper functions
│   │   │   ├── csvParser.js
│   │   │   ├── database.js
│   │   │   ├── dataLoader.js
│   │   │   └── responseFormatter.js
│   │   └── index.js             # Server entry point
│   ├── .env                     # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
├── frontend/                     # Frontend application
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── FilterPanel.jsx
│   │   │   ├── PaginationControls.jsx
│   │   │   ├── SalesTable.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── StatsCards.jsx
│   │   ├── hooks/               # Custom hooks
│   │   │   ├── useDebounce.js
│   │   │   ├── useFilterOptions.js
│   │   │   ├── useResponsive.js
│   │   │   └── useSalesData.js
│   │   ├── pages/               # Page components
│   │   │   └── SalesPage.jsx
│   │   ├── services/            # API services
│   │   │   ├── apiClient.js
│   │   │   └── salesService.js
│   │   ├── styles/              # Styling
│   │   │   ├── global.css
│   │   │   └── theme.js
│   │   ├── utils/               # Utility functions
│   │   │   ├── dateUtils.js
│   │   │   ├── formatters.js
│   │   │   ├── helpers.js
│   │   │   ├── storage.js
│   │   │   └── validators.js
│   │   ├── App.jsx              # Root component
│   │   └── main.jsx             # Entry point
│   ├── .env                     # Environment variables
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   └── vite.config.js           # Vite configuration
│
├── docs/                         # Documentation
│   └── architecture.md          # System architecture details
│
├── LICENSE                       # MIT License
└── README.md                     # This file
```

## 📖 Usage Guide

### Basic Usage

1. **View Transactions**: The main page displays all sales transactions in a paginated table
2. **Search**: Use the search bar to find transactions by ID, customer name, or product
3. **Filter**: Open the filter panel to apply multiple filters simultaneously
4. **Sort**: Click column headers to sort data
5. **Pagination**: Navigate through pages using the pagination controls at the bottom

### Advanced Filtering

1. Click the "Filters" button to open the filter panel
2. Select multiple options from each filter category:
   - **Region**: Filter by store location
   - **Gender**: Filter by customer gender
   - **Category**: Filter by product category
   - **Tags**: Filter by product tags
   - **Payment Method**: Filter by payment type
   - **Age Range**: Set min/max age
   - **Date Range**: Select start and end dates
3. Click "Apply Filters" to update results
4. Click "Clear Filters" to reset all filters

### Sorting Data

Click the sort dropdown and select from:
- Date (newest/oldest)
- Amount (highest/lowest)
- Quantity (most/least)
- Age (youngest/oldest)
- Product Name (A-Z/Z-A)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Rajput-xv** - *Initial work* - [GitHub Profile](https://github.com/Rajput-xv)

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---
