import dotenv from 'dotenv';
import app from './lib/express.js';
import { initRouter } from './src/router.js';

dotenv.config();

const HOST = process.env.SERVER_HOST;
const PORT = process.env.SERVER_PORT;

app.listen(PORT, HOST, () => {
    console.log(`Server listening on ${HOST}:${PORT}`);
});

initRouter(app);

