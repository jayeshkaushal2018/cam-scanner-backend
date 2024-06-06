const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

exports.annotateImage = async (image) => {
    const [result] = await client.batchAnnotateImages({
        requests: [
            {
                image: { content: image },
                features: [{ type: 'DOCUMENT_TEXT_DETECTION' }],
            },
        ],
    });

    return result.responses[0].textAnnotations;
};
