# Simple Node Blog Backend

This project is a backend application built with Node.js, Express, and MongoDB. It allows users to register, authenticate, and perform CRUD operations on blogs. The system uses JWT (JSON Web Tokens) for user authentication and authorization.

## Features

- User Authentication & Authorization:

  - User registration with secure password hashing.
  - User login to generate JWT token.
  - Middleware to verify user’s token for secured routes.

- Blog Management:

  - CRUD (Create, Read, Update, Delete) operations for blog posts.
  - Only the author of the blog can edit or delete their blog.

- Database:
  - MongoDB is used for storing Users and Blog data.

## Installation

1.  Clone the repository:
    ```
    git clone https://github.com/Alotab/simple-node-blog-backend.git
    cd simple-node-blog-backend
    ```
2.  Install dependencies:

    ```
    npm install
    ```

3.  Set up environment variables:
    Create a .env file in the root of your project with the following configuration:
    ```
    PORT=3000
    MONGO_DB_URL=mongodb+srv://your-db-username:your-password@cluster0.hxlnp.mongodb.net/
    JWT_SECRET_KEY=JWT_SECRET_KEY
    ```
4.  Run the application:
    ```
    npm run dev
    ```
    The application will run on http://localhost:3000 (or the port defined in the .env file).

## Docker Setup (Optional)

    If you prefer using Docker, you can build and run the application inside a container.

    ```
    docker-compose up --build
    ```

    The backend will be available at http://localhost:3000.
