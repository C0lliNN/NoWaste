import * as logger from 'firebase-functions/lib/logger';

export class Logger {
  logger;
  constructor() {
    this.logger = logger;
  }

  debug(...args: any[]) {
    this.logger.debug(args);
  }

  info(...args: any[]) {
    this.logger.info(args);
  }

  warn(...args: any[]) {
    this.logger.warn(args);
  }

  error(...args: any[]) {
    this.logger.error(args);
  }
}
