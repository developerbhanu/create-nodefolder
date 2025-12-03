import dotenv from 'dotenv';
import app from './app.js';
import { initRouter } from './src/router.js';

dotenv.config();

const PORT = process.env.SERVER_PORT;
const HOST = process.env.SERVER_HOST;

app.listen(PORT, HOST, () => {
    console.log(`Server listening on ${HOST}:${PORT}`);
});

initRouter(app);

