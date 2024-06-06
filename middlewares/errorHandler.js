const { logger } = require('../utils/logger');

module.exports = (err, req, res, next) => {
    logger.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
};
