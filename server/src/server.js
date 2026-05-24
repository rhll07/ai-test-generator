import fs from 'fs/promises';
import { app } from './app.js';
import { connectDB } from './config/db.js';
import { assertRequiredEnv, env } from './config/env.js';

const startServer = async () => {
  assertRequiredEnv();
  await fs.mkdir(env.uploadDir, { recursive: true });
  await fs.mkdir('tmp', { recursive: true });
  await connectDB();

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
};

startServer().catch((error) => {
  console.error(error);
  process.exit(1);
});
