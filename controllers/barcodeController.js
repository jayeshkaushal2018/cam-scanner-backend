const { annotateImage } = require('../utils/visionClient');
const { logger } = require('../utils/logger');
const Barcode = require('../models/Barcode');

exports.scanBarcodes = async (req, res, next) => {
  const { image } = req.body;

  if (!image) {
    logger.error('No image provided');
    return res.status(400).json({ error: 'No image provided' });
  }

  try {
    const barcodes = await annotateImage(image);

    // Save each barcode to the database
    const savedBarcodes = await Promise.all(
      barcodes.map(async (barcode) => {
        const newBarcode = new Barcode({ description: barcode.description });
        return newBarcode.save();
      })
    );

    res.json({ barcodes: savedBarcodes });
  } catch (error) {
    logger.error('Error scanning barcodes:', error);
    next(error); // Forward error to middleware
  }
};
