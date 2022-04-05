const locals = [
    'http://localhost:3001',
    '127.0.0.1:3001',
    'http://localhost:3000',
    '127.0.0.1:3002',
    'http://localhost:3002',
];


let origins = [...locals]

if (process.env.NODE_ENV == "production") {
    origins = [...origins]
} else {
    origins = [...origins]
}

export default {
    origin: origins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS', 'DELETE'],
    exposedHeaders: [
        'x-auth-token',
        'x-api-key',
        'x-api-secret',
        'x-total',
        'x-total-pages',
        'x-page',
        'x-per-page',
        'x-next-page',
        'x-prev-page',
        'x-offset'
    ],maxAge
    : 60 * 60 * 4
};
