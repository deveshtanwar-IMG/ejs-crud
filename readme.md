# CRUD Application with Express.js and EJS

This is a simple CRUD (Create, Read, Update, Delete) application built using Express.js and EJS template engine. It allows you to perform basic operations on a database, such as creating, reading, updating, and deleting records.

## Getting Started

To use this project on your local machine, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/deveshtanwar-IMG/ejs-crud
cd express-crud-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create .env File

Create a `.env` file in the root of the project and add the following variables:

```env
PORT=5001  # You can change the port number
DB_URI=your_database_uri_here  # Replace with your MongoDB URI
```

### 4. Create 'uploads' Folder

Create a folder named `uploads` in the root of the project. This folder will be used to save uploaded images.

### 5. Run the Application

```bash
npm start
```

The application will be running on `http://localhost:5001` (or the port you specified in the `.env` file).

## Features

- **Create:** Add new records to the database.
- **Read:** View all records or details of a specific record.
- **Update:** Modify existing records.
- **Delete:** Remove records from the database.

## Technologies Used

- **Express.js:** A web application framework for Node.js.
- **EJS:** A simple templating language that lets you generate HTML markup with plain JavaScript.
- **MongoDB:** A NoSQL database for storing data.

## Folder Structure

- `views`: Contains EJS templates for rendering views.
- `public`: Static assets such as stylesheets and client-side JavaScript.
- `uploads`: Folder to store uploaded images.
- `routes`: Express route handlers.
- `models`: MongoDB models for defining the schema and interacting with the database.
- `controllers`: Controllers for handling the business logic.

## Contributing

Feel free to contribute to this project by submitting pull requests or opening issues. Your feedback and contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.