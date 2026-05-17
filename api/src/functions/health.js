const { app } = require('@azure/functions');

app.http('health', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'health',
    handler: async (request, context) => {
        context.log(`Health check requested from url "${request.url}"`);

        const payload = {
            status: 'Healthy',
            timestamp: new Date().toISOString(),
            uptimeSeconds: process.uptime(),
            service: 'Azure Functions HTTP API',
            endpoints: {
                default: '/',
                health: '/api/health',
                solar: '/api/solar'
            }
        };

        return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };
    }
});
