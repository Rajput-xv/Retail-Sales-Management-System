# System Architecture

## Backend Architecture

### Technology Stack
- Runtime: Node.js
- Framework: Express.js
- Data Processing: CSV Parser
- CORS: Enabled for cross-origin requests

### Folder Structure
```
backend/
├── src/
│   ├── controllers/     # Request handlers and response formatting
│   ├── services/        # Business logic and data processing
│   ├── utils/           # Helper functions and utilities
│   ├── routes/          # API endpoint definitions
│   ├── models/          # Data models and schemas
│   └── index.js         # Server entry point
├── package.json
└── .env
```

### Module Responsibilities

#### Controllers Layer
Handles incoming HTTP requests, validates input parameters, delegates business logic to services, and formats responses. Each controller focuses on a specific domain.

#### Services Layer
Contains core business logic including:
- Data loading and parsing from CSV
- Search implementation across multiple fields
- Multi-dimensional filtering logic
- Sorting algorithms
- Pagination calculation and data slicing
- Data transformation and aggregation

#### Utils Layer
Provides reusable utility functions:
- CSV parsing and validation
- Data type conversions
- Date formatting and comparison
- Error handling utilities
- Response formatters

#### Routes Layer
Defines API endpoints and maps them to controller methods. Implements middleware for request validation and error handling.

#### Models Layer
Defines data structures and validation schemas for sales transactions, ensuring data consistency across the application.

### Data Flow

1. Client sends HTTP request to API endpoint
2. Route handler receives request and applies middleware
3. Controller validates request parameters
4. Service layer processes business logic
5. Data utilities handle CSV parsing and transformations
6. Service returns processed data
7. Controller formats response
8. Response sent back to client

### API Design Pattern

RESTful API architecture with:
- Stateless request handling
- JSON request/response format
- Proper HTTP status codes
- Error handling middleware
- CORS support for frontend integration

## Frontend Architecture

### Technology Stack
- Framework: React 18
- Build Tool: Vite
- UI Library: Ant Design 5
- Routing: React Router v6
- HTTP Client: Axios
- State Management: React Hooks

### Folder Structure
```
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page-level components
│   ├── services/        # API integration layer
│   ├── utils/           # Helper functions
│   ├── hooks/           # Custom React hooks
│   ├── styles/          # Global styles and theme
│   ├── App.jsx          # Root component
│   └── main.jsx         # Application entry point
├── public/              # Static assets
└── index.html
```

### Module Responsibilities

#### Components Layer
Reusable, presentational components:
- SearchBar: Full-text search input with debouncing
- FilterPanel: Multi-select filters for various dimensions
- SalesTable: Data grid with sorting capabilities
- Pagination: Navigation controls for data pages
- Each component is self-contained and responsive

#### Pages Layer
Page-level components that compose multiple components:
- SalesPage: Main dashboard integrating all features
- Handles overall state management
- Coordinates component interactions

#### Services Layer
API communication abstraction:
- Axios instance configuration
- API endpoint definitions
- Request/response interceptors
- Error handling and retry logic
- Data transformation before sending to backend

#### Hooks Layer
Custom React hooks for:
- Data fetching and caching
- Search debouncing
- Filter state management
- Pagination logic
- Window resize detection for responsiveness

#### Utils Layer
Helper functions for:
- Date formatting
- Number formatting
- Data validation
- Local storage management
- URL parameter handling

#### Styles Layer
Global styles and theme configuration:
- Ant Design theme customization
- Responsive breakpoints
- Common utility classes
- Color palette definitions

### Data Flow

1. User interacts with UI component
2. Component triggers event handler
3. Custom hook or service function called
4. API service makes HTTP request to backend
5. Response received and transformed
6. Component state updated
7. UI re-renders with new data

### State Management Strategy

Utilizes React's built-in hooks for state management:
- useState for local component state
- useEffect for side effects and data fetching
- Custom hooks for shared logic
- URL parameters for shareable filter states
- No external state management library needed

## Communication Protocol

### Request Flow
```
Frontend → HTTP Request → Backend API → Data Processing → Response → Frontend Update
```

### API Endpoints Pattern
```
GET /api/sales/transactions
  Query Parameters:
  - search: string
  - filters: object
  - sort: string
  - page: number
  - pageSize: number
```