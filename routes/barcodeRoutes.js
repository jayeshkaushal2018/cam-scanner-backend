const express = require('express');
const { check } = require('express-validator');
const { scanBarcodes } = require('../controllers/barcodeController');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

router.post(
    '/',
    [
        check('image')
            .notEmpty()
            .withMessage('Image is required')
            .isBase64()
            .withMessage('Image must be a valid Base64 string'),
    ],
    validateRequest,
    scanBarcodes
);

module.exports = router;
