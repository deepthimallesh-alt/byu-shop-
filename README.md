# BYU - Premium Modern E-Commerce Platform

A production-grade, full-stack e-commerce web application engineered with a clean architecture, featuring comprehensive product discovery, dynamic multi-facet filtering, shopping bag with live promotions, streamlined checkout, order tracking with interactive status timelines, verified product reviews, user vault wishlist, user profiles with multiple address management, and an administrative command center with role-based access control.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Technology Stack](#technology-stack)
4. [Architecture & Project Structure](#architecture--project-structure)
5. [Environment Variables](#environment-variables)
6. [Installation & Setup](#installation--setup)
7. [Database Setup & Seeding](#database-setup--seeding)
8. [Running the Application](#running-the-application)
9. [Automated Test Suite](#automated-test-suite)
10. [REST API Documentation](#rest-api-documentation)
11. [Admin & Demo Credentials](#admin--demo-credentials)
12. [Production Deployment](#production-deployment)

---

## Project Overview

BYU is designed as a luxury commerce destination showcasing precision audio equipment, designer apparel, Swiss-caliber timepieces, contemporary living objects, and performance footwear. The application includes both client and server responsibilities:
- **Client (React + Tailwind CSS)**: Modern, responsive UI with zero fluff, subtle shadows, clean typography (Plus Jakarta Sans), loading skeletons, and interactive state management.
- **Server (Node.js + Express REST API)**: Secure endpoints with JWT token validation, bcrypt password hashing, input sanitization, and structured responses.
- **Database (MongoDB Document Datastore)**: Document-oriented architecture modeling Users, Products, Categories, Carts, Orders, Reviews, Wishlists, and Addresses with automatic timestamps and schema constraints.

---

## Key Features

- **Product Discovery & Exploration**:
  - Full-text search with 250ms debouncing and instant autocomplete dropdown.
  - Multi-facet filters: Department/Category, Price range bounds, Star rating threshold, Brand selection, and In-Stock availability toggle.
  - Sorting: Price (Low/High), Popularity, Highest Rated, Newest Arrivals, and Alphabetical.
  - Clean SEO slugs (`/products/byu-horizon-pro-wireless-headphones`).
  - Grid & List view layout toggles with pagination.

- **Product Details & Social Proof**:
  - Multi-angle high-resolution gallery with thumbnail switcher.
  - Sizing and color variant selection.
  - Quantity controls with live stock boundaries.
  - Detailed technical specifications and key feature lists.
  - Customer review submission with 5-star rating breakdown and verified buyer verification.
  - Related product recommendations based on department.

- **Cart & Bag Engine**:
  - Slide-out Cart Drawer + dedicated full-page Cart.
  - Dynamic Free Shipping Progress Bar (free shipping on orders over $150).
  - Promotional coupon engine (e.g. `BYU15` for 15% off, `WELCOME10` for 10% off).
  - Automatic calculation of subtotal, tax (8%), shipping, and discounts.

- **Secure Checkout & Order Placement**:
  - Contact information and shipping destination.
  - Multiple delivery speeds: Complimentary Standard, Express 2-Day Air ($15), Overnight White-Glove ($25).
  - Mock payment options: Credit Card, Digital Wallet (Apple/Google Pay), Cash on Delivery.
  - Inventory decrement upon successful order creation.
  - Instant order confirmation view with unique Order ID and Tracking Number.

- **Order Management & Timeline Tracking**:
  - Live visual shipment timeline: Order Placed → Fulfillment Hub → In Transit → Delivered.
  - Chronological activity history with carrier notes and timestamps.

- **Personal User Dashboard & Wishlist Vault**:
  - Profile info (name, phone, avatar).
  - Multiple stored shipping addresses (add, set default, remove).
  - Password and credentials security management.
  - Wishlist vault with 1-click move to shopping bag.

- **Administrative Command Center (`/admin`)**:
  - Role-protected access (rejects unauthorized users with 403).
  - Financial KPI metrics: Total revenue, total orders, completed dispatches, product count, registered members.
  - Low inventory alert system for items with ≤15 units in warehouse stock.
  - Product Catalog Management: Add product modal, edit product, and delete.
  - Department Management: Add and inspect product categories.
  - Order Management: Live status switcher (Pending, Processing, Shipped, Delivered, Cancelled).
  - User Management: Inspect registered accounts, toggle between Customer and Admin roles.

---

## Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React icons, Motion
- **Backend**: Node.js, Express 4, TypeScript (via `tsx`)
- **Authentication**: JSON Web Tokens (`jsonwebtoken`), bcrypt password hashing (`bcryptjs`)
- **Database**: MongoDB document datastore (`MongoCollection` with ObjectId generation, indexing, filtering, and persistence in `data/store.json`)
- **Build Tool**: Vite 8 with `@vitejs/plugin-react` and `@tailwindcss/vite`

---

## Architecture & Project Structure

```text
├── .env.example              # Template environment variables
├── index.html                # Entry point with SEO metadata & Plus Jakarta Sans
├── package.json              # Scripts & dependencies
├── server.ts                 # Express backend server & Vite dev integration
├── server/
│   ├── db/
│   │   ├── database.ts       # MongoDB-compatible document store & collection manager
│   │   └── models.ts         # User, Product, Category, Cart, Order, Review interfaces
│   ├── middleware/
│   │   └── auth.ts           # JWT authentication and requireAdmin middleware
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── productController.ts
│   │   ├── categoryController.ts
│   │   ├── cartController.ts
│   │   ├── orderController.ts
│   │   ├── reviewController.ts
│   │   ├── userController.ts
│   │   ├── adminController.ts
│   │   └── wishlistController.ts
│   ├── routes/               # Express REST routers
│   ├── seedData.ts           # Realistic seed dataset (30+ products, 6 categories)
│   ├── seed.ts               # Database seed runner script
│   └── test.ts               # Automated backend test suite
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── AuthModal.tsx
│   │   ├── RatingStars.tsx
│   │   ├── Pagination.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   └── EmptyState.tsx
│   ├── context/              # React Context Providers
│   │   ├── AuthContext.tsx
│   │   ├── CartContext.tsx
│   │   ├── WishlistContext.tsx
│   │   └── ToastContext.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── ProductsPage.tsx
│   │   ├── ProductDetailsPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── OrdersPage.tsx
│   │   ├── WishlistPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── AdminDashboardPage.tsx
│   ├── services/
│   │   └── api.ts            # Typed REST API service layer
│   ├── types/
│   │   └── index.ts          # Shared TypeScript models
│   ├── App.tsx               # Master routing and provider tree
│   ├── index.css             # Tailwind CSS & theme definitions
│   └── main.tsx              # React DOM root
```

---

## Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Description | Default |
|---|---|---|
| `DATABASE_URL` | MongoDB connection URI | `mongodb://localhost:27017/byu_ecommerce` |
| `JWT_SECRET` | Secret key for signing and verifying tokens | `byu_super_secret_jwt_key_2026_modern_ecommerce` |
| `API_URL` | REST API base URL | `http://localhost:3000/api` |
| `PORT` | Web server port | `3000` |
| `NODE_ENV` | Environment mode (`development` or `production`) | `development` |

---

## Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Seed the database**:
   ```bash
   npm run seed
   ```

3. **Run automated verification tests**:
   ```bash
   npm test
   ```

---

## Database Setup & Seeding

The app includes an embedded MongoDB-compatible document datastore that persists to `data/store.json`.
On first launch, if the catalog is empty, it automatically seeds 30+ products across 6 departments:
1. Audio & Acoustics (Headphones, earbuds, speakers, studio monitors)
2. Designer Apparel (Italian wool overcoats, Supima tees, French terry hoodies)
3. Timepieces & Luxury (Swiss automatic chronographs, dive watches, Horween wallets)
4. Home & Modern Living (Artisan pour-over sets, aluminum lamps, walnut monitor risers)
5. Footwear & Sneakers (Carbon-plate marathon racers, Italian Nappa trainers)
6. Smart Tech & Gadgets (Qi2 3-in-1 docks, 75% mechanical keyboards, GaN chargers)

To force reseed at any time:
```bash
npm run seed
```
Or trigger via API: `POST /api/seed`

---

## Running the Application

### Development Mode
Runs Express with Vite middlewares mounted on port 3000:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### Production Build & Launch
```bash
npm run build
npm start
```

---

## Automated Test Suite

Run the test suite:
```bash
npm test
```

The test validates:
- Password hashing with `bcryptjs` and comparison accuracy
- User creation and persistence
- JWT token signing and payload verification
- Product queries with regex search and category filtering
- Pagination limit boundaries
- Cart creation, items addition, and tax/subtotal calculation
- Order creation, status tracking, and inventory decrement
- Role-based authorization rules (admin protection)

---

## REST API Documentation

### Response Format
Successful:
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```
Error:
```json
{
  "success": false,
  "message": "Error description"
}
```

### Endpoints
#### Authentication
- `POST /api/auth/register` - Create new customer account
- `POST /api/auth/login` - Authenticate and retrieve JWT token
- `POST /api/auth/logout` - Logout session
- `GET /api/auth/me` - Get current authenticated user profile
- `POST /api/auth/forgot-password` - Request password reset instructions
- `POST /api/auth/reset-password` - Reset account password

#### Products
- `GET /api/products` - List products with query params (`search`, `category`, `brand`, `minPrice`, `maxPrice`, `minRating`, `inStock`, `sortBy`, `page`, `limit`)
- `GET /api/products/:id` - Get product by `_id` or SEO `slug`
- `POST /api/products` - (Admin) Create new product
- `PUT /api/products/:id` - (Admin) Update product details
- `DELETE /api/products/:id` - (Admin) Delete product

#### Categories
- `GET /api/categories` - List categories with item counts
- `POST /api/categories` - (Admin) Create category
- `PUT /api/categories/:id` - (Admin) Update category
- `DELETE /api/categories/:id` - (Admin) Delete category

#### Cart
- `GET /api/cart` - Retrieve current cart
- `POST /api/cart` - Add item (`productId`, `quantity`, `size`, `color`)
- `PUT /api/cart/:productId` - Update item quantity
- `DELETE /api/cart/:productId` - Remove item from cart
- `POST /api/cart/coupon` - Apply coupon (`BYU15` or `WELCOME10`)
- `POST /api/cart/clear` - Clear entire cart

#### Orders
- `POST /api/orders` - Place order (decrements inventory)
- `GET /api/orders` - Get orders for current user
- `GET /api/orders/:id` - Get order by ID or order number
- `PUT /api/orders/:id/status` - Update order status & append timeline

#### Reviews
- `GET /api/products/:id/reviews` - Get product reviews & star breakdown
- `POST /api/products/:id/reviews` - (Auth) Post verified review & recalculate rating
- `DELETE /api/reviews/:id` - Delete review

#### User Profile
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile / change password
- `POST /api/users/address` - Add new shipping address
- `DELETE /api/users/address/:addressId` - Delete shipping address

#### Wishlist
- `GET /api/wishlist` - Get wishlist items
- `POST /api/wishlist/:productId` - Toggle product in wishlist
- `DELETE /api/wishlist/:productId` - Remove product from wishlist

#### Admin
- `GET /api/admin/stats` - (Admin) KPI metrics, recent dispatches, low stock alerts
- `GET /api/admin/users` - (Admin) List all users
- `PUT /api/admin/users/:id/role` - (Admin) Change user role (`admin` or `customer`)

---

## Admin & Demo Credentials

For quick evaluation, click the **"Quick 1-Click Demo Login"** buttons inside the Sign In modal:
- **Admin Account**:
  - Email: `admin@byu.store`
  - Password: `admin1234`
  - Role: `admin` (Unlocks the Admin Dashboard and catalog controls)
- **Customer Account**:
  - Email: `user@byu.store`
  - Password: `user1234`
  - Role: `customer` (Includes pre-seeded order history and wishlist items)

---

## Production Deployment

1. Build the frontend client bundle:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```
The Express server in `server.ts` will serve the optimized static files from `dist/` and handle all `/api/*` REST endpoints on the specified `PORT` (default 3000).
