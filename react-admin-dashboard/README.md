# React Admin Dashboard with Express Server Backend

This project is an **Admin Dashboard** built with **React Admin** on the frontend and **Express.js** on the backend. The backend interacts with a JSON file (`db.json`) to perform CRUD operations, simulating a simple database. The dashboard allows you to manage both **products** and **users**.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Products Endpoints](#products-endpoints)
  - [Users Endpoints](#users-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **CRUD Operations** for products and users.
- **Pagination** support for product and user listings.
- **Simulated Database** using a JSON file (`db.json`).
- **React Admin** for a simple and intuitive dashboard UI.
- **Express.js** backend with routes for handling product and user data.

## Tech Stack

### Frontend:

- React.js (React Admin)
- Axios (for HTTP requests)

### Backend:

- Node.js
- Express.js
- JSON file (`db.json`) for data storage

## Installation

### Prerequisites

Before you begin, make sure you have the following installed on your system:

- **Node.js** (v14 or higher)
- **npm** (Node package manager)

### Backend Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/react-admin-dashboard.git
   ```

2. **Navigate to the backend directory**:

   ```bash
   cd react-admin-dashboard-json-backend/server
   ```

3. **Install the backend dependencies**:

   ```bash
   npm install
   ```

4. **Start the backend server**:

   ```bash
   npm run server
   ```

   The server will start at `http://localhost:3000`.

### Frontend Setup

1. **Navigate to the `client` directory**:

   ```bash
   cd ../client
   ```

2. **Install the frontend dependencies**:

   ```bash
   npm install
   ```

3. **Run the frontend**:

   ```bash
   npm start
   ```

   The React Admin dashboard will be available at `http://localhost:5173`.

## Usage

Once both the frontend and backend are running, you can start using the **Admin Dashboard** to:

- View the list of products and users.
- Add new products and users.
- Update existing products and users.
- Delete products and users.

The data will be stored in the `db.json` file located in the `server` folder.

## API Endpoints

The backend provides the following endpoints for managing **products** and **users**.

### Products Endpoints

- **GET** `/products` - Retrieve all products (supports pagination).
- **POST** `/products` - Create a new product.
- **PUT** `/products/:id` - Update a product by its ID.
- **DELETE** `/products/:id` - Delete a product by its ID.

### Users Endpoints

- **GET** `/users` - Retrieve all users (supports pagination).
- **POST** `/users` - Create a new user.
- **PUT** `/users/:id` - Update a user by its ID.
- **DELETE** `/users/:id` - Delete a user by its ID.

## Contributions

Contributions to the project are welcome! If you want to contribute, follow these guidelines to get started:

### 1. Fork the Repository

Start by forking the repository to your own GitHub account. This will allow you to work on your own copy of the project:

- Go to the repository page: [react-js-mini-projects/react-admin-dashboard](https://github.com/danielace1/react-js-mini-projects/tree/main/react-admin-dashboard)
- Click on the "Fork" button in the top right corner.

### 2. Clone Your Forked Repository

Once you've forked the repository, clone your fork to your local machine:

```bash
git clone https://github.com/your-username/react-admin-dashboard.git
cd react-admin-dashboard
```

### 3. Create a new branch for your feature or bugfix

```bash
git checkout -b your-feature-name
```

### 4. Make Your Changes

Make your changes to the codebase. Be sure to follow the project's coding conventions and best practices.

### 5. Commit Your Changes

```bash
git add .
git commit -m "Add your descriptive commit message here"
```

### 6. Push Your Changes

### 7. Create a Pull Request

Feel free to adjust any parts as needed. Let me know if you require any further modifications!

## References

<a href="https://www.youtube.com/watch?v=tPePxSc8JSU&list=PL5mydh8SndyO_5BML4bVF-8MqsT4UB_1t&index=13"> <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png" alt="YouTube Logo" width="25" height="20"> </a> [React Admin Dashboard Tutorial](https://www.youtube.com/watch?v=tPePxSc8JSU&list=PL5mydh8SndyO_5BML4bVF-8MqsT4UB_1t&index=13)

## Author

- [Sudharsan](https://www.facebook.com/sudharsandaniel01)
