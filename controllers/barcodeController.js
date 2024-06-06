const { annotateImage } = require('../utils/visionClient');
const { logger } = require('../utils/logger');

exports.scanBarcodes = async (req, res, next) => {
    const { image } = req.body;

    if (!image) {
        logger.error('No image provided');
        return res.status(400).json({ error: 'No image provided' });
    }

    try {
        const barcodes = await annotateImage(image);
        res.json({ barcodes });
    } catch (error) {
        logger.error('Error scanning barcodes:', error);
        next(error); // Forward error to middleware
    }
};
