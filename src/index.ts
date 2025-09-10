import { app } from './app';
import { config } from './config/index';
import { logger } from './logging/logger';
import { onShutdown } from './server/shutdown';

const port = config.port;

const server = app.listen(port, () => {
  logger.info(`Server started on port ${port}`);
});

onShutdown(server);
