import pino from 'pino';
import { config } from '../config/index';

export const logger = pino({
  level: config.logLevel,

  ...(config.isDevelopment && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        ignore: 'pid,hostname',
      },
    },
  }),
});
