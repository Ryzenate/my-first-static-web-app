module.exports = {
    ok(data) {
        return {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                success: true,
                timestamp: new Date().toISOString(),
                data
            })
        };
    },

    error(message, status = 500) {
        return {
            status,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                success: false,
                timestamp: new Date().toISOString(),
                error: message
            })
        };
    }
};
