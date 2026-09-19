import express from 'express';
import authorsRoutes from './routes/authorsRoutes.js'
import { logger } from './middleware/logger.js';

// creating the express app
const app = express();

// the port the server is running on
const PORT = 4000;

// allow our express server to understand JSON requests
app.use(express.json());

// tells express to run the logger middleware for every incoming request
app.use(logger);

// makes each route inside authorsRoutes.ts start with (/authors)
app.use('/authors', authorsRoutes);

// creates the apps first route
app.get('/', (req, res) => {
    res.json({
        message: 'Library API is running'
    });
});

// this actually starts the server.
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});