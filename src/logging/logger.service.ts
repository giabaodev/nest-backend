import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
// import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      // transports: [
      //   new DailyRotateFile({
      //     filename: './logs/application-%DATE%.log',
      //     datePattern: 'YYYY-MM-DD',
      //     zippedArchive: true,
      //     maxSize: '20m',
      //     maxFiles: '14d',
      //   }),
      // ],
    });

    // Console log transport for non-production environments
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      );
    }
  }

  log(message: string): winston.Logger {
    return this.logger.info(message);
  }

  error(message: string, trace: string): winston.Logger {
    return this.logger.error(message, { trace });
  }

  warn(message: string): winston.Logger {
    return this.logger.warn(message);
  }

  debug(message: string): winston.Logger {
    return this.logger.debug(message);
  }

  verbose(message: string): winston.Logger {
    return this.logger.verbose(message);
  }
}
