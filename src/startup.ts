import { startServer } from '@src/server';

const PORT_ENV = process.env.PORT as number | undefined;

startServer(PORT_ENV || 3000)
  .catch(console.log);
