const mongoose = require('mongoose');

const barcodeSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  dateScanned: {
    type: Date,
    default: Date.now,
  },
});

const Barcode = mongoose.model('Barcode', barcodeSchema);

module.exports = Barcode;
