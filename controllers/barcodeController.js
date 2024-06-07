const { annotateImage } = require('../utils/visionClient');
const { logger } = require('../utils/logger');

exports.scanBarcodes = async (req, res, next) => {
    const { image } = req.body;

    try {
        const barcodes = await annotateImage(image);
        res.json({ barcodes });
    } catch (error) {
        logger.error('Error scanning barcodes:', error);
        next(error); // Forward error to middleware
    }
};
