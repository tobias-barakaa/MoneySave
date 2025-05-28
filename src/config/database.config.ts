import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    database: {
        database: process.env.DATABASE_URL || '',
    },
}));