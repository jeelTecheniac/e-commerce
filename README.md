# E-Commerce Application

A modern e-commerce application built with React, Redux, and Tailwind CSS that allows users to browse products, search, add to cart, and manage their shopping cart.

## Live Demo

[View Live Demo](https://jocular-salmiakki-05650a.netlify.app/)

## Features

- **User Authentication**

  - Registration with form validation
  - Login with secure authentication
  - Protected routes (redirect to login if not authenticated)

- **Product Management**

  - Browse product listings with details
  - Search functionality with debouncing
  - Filter products by category
  - Sort products by price, popularity, etc.

- **Shopping Cart**

  - Add products to cart
  - Update product quantities
  - Remove products from cart
  - Calculate total price

- **Responsive Design**
  - Mobile-friendly interface
  - Optimized for all screen sizes
  - Modern UI with Tailwind CSS

## Technologies Used

- **Frontend**

  - React.js
  - Redux (state management)
  - React Router (navigation)
  - Formik & Yup (form validation)
  - Tailwind CSS (styling)

- **Deployment**
  - Netlify

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory
   ```bash
   cd e-commerce-assignment
   ```
3. Install dependencies
   ```bash
   npm install
   ```
4. Start the development server
   ```bash
   npm start
   ```
5. Open your browser and visit http://localhost:3000

## Project Structure

````plaintext
```src/
├── components/
│   ├── Auth/
│   │   ├── LoginForm.jsx
│   │   └── RegisterForm.jsx
│   ├── Cart/
│   │   ├── CartItem.jsx
│   │   └── CartSummary.jsx
│   ├── Layout/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   └── Products/
│       ├── ProductCard.jsx
│       └── ProductList.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   ├── ProductPage.jsx
│   ├── CartPage.jsx
│   └── RegisterPage.jsx
├── redux/
│   ├── slices/
│   │   ├── authSlice.js
│   │   ├── cartSlice.js
│   │   └── productSlice.js
│   └── store.js
├── App.js
└── index.js
````
