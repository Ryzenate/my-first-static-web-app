const { app } = require('@azure/functions');

const latestSolarActivity = () => ({
    source: 'sample-solar-data',
    retrievedAt: new Date().toISOString(),
    solarFlares: [
        {
            id: 'flare-2026-05-16-01',
            class: 'M1.2',
            peakTime: '2026-05-16T03:28:00Z',
            activeRegion: 'AR3456',
            description: 'Moderate solar flare observed in the active region near the solar equator.',
            probabilityGeomagneticStorm: 'Moderate'
        },
        {
            id: 'flare-2026-05-15-09',
            class: 'C7.8',
            peakTime: '2026-05-15T09:12:00Z',
            activeRegion: 'AR3458',
            description: 'Small solar flare from a decaying sunspot group.',
            probabilityGeomagneticStorm: 'Low'
        }
    ],
    geomagneticStorms: [
        {
            id: 'storm-2026-05-16-01',
            startTime: '2026-05-16T02:00:00Z',
            endTime: '2026-05-16T11:30:00Z',
            kpIndex: 5,
            category: 'G1',
            description: 'Minor geomagnetic storm from elevated solar wind and CME activity.',
            expectedImpacts: [
                'Aurora visible at high latitudes',
                'Minor radio blackouts possible',
                'GPS signal degradation may occur'
            ]
        }
    ]
});

app.http('solarData', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'solar',
    handler: async (request, context) => {
        context.log(`Solar activity request received for url "${request.url}"`);

        const data = latestSolarActivity();

        return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
    }
});
