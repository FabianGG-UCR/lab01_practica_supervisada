import { app } from './app.js';
import { config } from './config/index.js';
import { logger } from './logging/logger.js';
import { onShutdown } from './server/shutdown.js';

const port = config.port;

const server = app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});

onShutdown(server);
