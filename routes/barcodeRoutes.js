const express = require('express');
const { scanBarcodes } = require('../controllers/barcodeController');

const router = express.Router();

router.post('/', scanBarcodes);

module.exports = router;
