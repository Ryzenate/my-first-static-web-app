const { app } = require('@azure/functions');
const blob = require('../utils/blob');
const response = require('../utils/response');

app.http('listFiles', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'v1/files',
    handler: async (req, ctx) => {
        try {
            const sasUrl = process.env.MY_CONTAINER_SAS_URL;
            const files = await blob.listFiles(sasUrl);
            return response.ok(files);
        } catch (err) {
            ctx.log.error(err);
            return response.error("Failed to list files");
        }
    }
});
