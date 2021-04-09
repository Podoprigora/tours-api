import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
    path: path.resolve(__dirname, `../${process.env.NODE_ENV}.env`)
});

export const config = {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3005', 10),
    host: process.env.HOST || 'localhost',

    staticBasePath: process.env.STATIC_BASE_PATH || 'public',
    staticOptions: {
        index: process.env.STATIC_OPTIONS_INDEX || 'index.html',
        maxAge: process.env.STATIC_OPTIONS_MAX_AGE || '0'
    }
} as const;
