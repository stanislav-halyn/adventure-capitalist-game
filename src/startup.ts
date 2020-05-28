import path from 'path';
import dotenv from 'dotenv';

import { startServer } from '@src/server';

// Init .env variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const PORT = +(process.env.PORT || 3000);

startServer(PORT)
  .catch(console.log);
