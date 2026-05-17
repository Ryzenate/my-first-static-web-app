const { BlobServiceClient } = require('@azure/storage-blob');

module.exports = {
    async listFiles(containerSasUrl) {
        const containerClient = new BlobServiceClient(containerSasUrl).getContainerClient();

        const files = [];
        for await (const blob of containerClient.listBlobsFlat()) {
            files.push({
                name: blob.name,
                size: blob.properties.contentLength,
                lastModified: blob.properties.lastModified
            });
        }

        return files;
    },

    async downloadFile(containerSasUrl, blobName) {
        const containerClient = new BlobServiceClient(containerSasUrl).getContainerClient();
        const blobClient = containerClient.getBlobClient(blobName);

        const download = await blobClient.download();
        const buffer = await streamToBuffer(download.readableStreamBody);

        return buffer;
    }
};

async function streamToBuffer(stream) {
    const chunks = [];
    for await (const chunk of stream) chunks.push(chunk);
    return Buffer.concat(chunks);
}
