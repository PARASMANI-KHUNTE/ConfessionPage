# ConfessionPage
# Confession App

This is a simple web application where users can submit confessions, and an admin can log in to view them. The application uses Express.js for the server, MongoDB Atlas for the database, and serves static files for the frontend.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

The Confession App allows users to submit confessions anonymously. An admin can log in with a password to view all submitted confessions. The app uses MongoDB to store confessions and includes routes to handle user submissions and admin functionalities.

## Features

- User confession submission
- Admin login with password validation
- View all submitted confessions
- Count the number of confessions

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/PARASMANI-KHUNTE/ConfessionPage.git
    cd ConfessionPage
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```plaintext
    PORT=3000
    MONGODB_URI=your_mongodb_uri
    ADMIN_PASSWORD=admin123
    ```

4. **Run the application:**
    ```bash
    npm start
    ```

## Environment Variables

- `PORT`: The port number on which the server will run (default is 3000).
- `MONGODB_URI`: The connection string for your MongoDB Atlas database.
- `ADMIN_PASSWORD`: The password for the admin to log in and view confessions.

## API Endpoints

### Serve Static Files

- **Endpoint:** `GET /`
- **Description:** Serves the `home.html` file from the `public/templates` directory.
- **Response:** Returns the `home.html` file.

### Serve `main.js` File

- **Endpoint:** `GET /main.js`
- **Description:** Serves the `main.js` file from the root directory.
- **Response:** Returns the `main.js` file.

### Submit Confession

- **Endpoint:** `POST /submitConfession`
- **Description:** Submits a new confession.
- **Request Body:**
    ```json
    {
        "username": "your_username",
        "confession": "your_confession"
    }
    ```
- **Response:** Sends status 200 on success.

### Admin Login Click

- **Endpoint:** `POST /adminLoginClick`
- **Description:** Logs the admin button click and redirects to the login page.
- **Response:** Sends status 200 on success.

### Admin Login Page

- **Endpoint:** `GET /admin`
- **Description:** Serves the `mainAdmin.html` file from the `public/templates` directory.
- **Response:** Returns the `mainAdmin.html` file.

### Validate Admin Password

- **Endpoint:** `POST /validatePassword`
- **Description:** Validates the admin password.
- **Request Body:**
    ```json
    {
        "password": "admin_password"
    }
    ```
- **Response:** Sends status 200 if the password is correct, 401 otherwise.

### Count Confessions

- **Endpoint:** `GET /count`
- **Description:** Counts the number of confessions in the database.
- **Response:** Returns the count as a JSON response.
    ```json
    {
        "count": number_of_confessions
    }
    ```

### Fetch All Confessions

- **Endpoint:** `GET /confessions`
- **Description:** Fetches all confessions from the database.
- **Response:** Returns the confessions as a JSON response.
    ```json
    {
        "confessions": [
            {
                "username": "user1",
                "confession": "confession text",
                "_id": "document_id"
            },
            ...
        ]
    }
    ```

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

### Steps to Contribute

1. **Fork the repository.**
2. **Create a new branch:**
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. **Make your changes.**
4. **Commit your changes:**
    ```bash
    git commit -m 'Add some feature'
    ```
5. **Push to the branch:**
    ```bash
    git push origin feature/your-feature-name
    ```
6. **Open a pull request.**

## License

This project is licensed under the MIT License.

## Contact

If you have any questions or suggestions, feel free to contact me at:

- GitHub: [yourusername](https://github.com/yourusername)

Thank you for using the Confession App!
