require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const barcodeRoutes = require('./routes/barcodeRoutes');
const errorHandler = require('./middlewares/errorHandler');
const { logger } = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet()); // Security headers
app.use(bodyParser.json({ limit: '10mb' }));

// Routes
app.use('/api/barcodes', barcodeRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
