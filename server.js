const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const vision = require('@google-cloud/vision');

// Create a client
const client = new vision.ImageAnnotatorClient();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

app.post('/scan-barcodes', async (req, res) => {
    const { image } = req.body;

    try {
        const [result] = await client.batchAnnotateImages({
            requests: [
                {
                    image: { content: image },
                    features: [{ type: 'DOCUMENT_TEXT_DETECTION' }],
                },
            ],
        });

        const barcodes = result.responses[0].textAnnotations;
        res.json({ barcodes });
    } catch (error) {
        console.error('Error scanning barcodes:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
