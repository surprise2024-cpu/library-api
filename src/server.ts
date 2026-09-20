import express from 'express';
import authorsRoutes from './routes/authorsRoutes.js'
import { logger } from './middleware/logger.js';
import booksRoutes from './routes/booksRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

// creating the express app
const app = express();

// the port the server is running on
const PORT = 4000;

// allows our express server to understand JSON requests
app.use(express.json());

// tells express to run the logger middleware for every incoming request
app.use(logger);

// creates the apps first route
app.get('/', (req, res) => {
    res.json({
        message: 'Library API is running'
    });
});

// makes each route inside authorsRoutes.ts start with (/authors)
app.use('/authors', authorsRoutes);

// makes each route inside booksRoutes.ts start with (/books)
app.use('/books', booksRoutes);

// gives the app a response to give for routes that are not within the apps specifics
app.use(notFound);

// gives the app access to centralized error handlers
app.use(errorHandler);

// this actually starts the server.
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});