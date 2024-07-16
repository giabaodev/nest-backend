import {
  Injectable,
  LoggerService,
  Logger as NestLogger,
} from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class MyLoggerService implements LoggerService {
  private readonly logger: Logger;
  private context?: string;

  constructor() {
    this.logger = createLogger({
      transports: [
        new transports.Console({
          format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.colorize(),
            format.printf(({ timestamp, level, message, context, trace }) => {
              return `${timestamp} [${context}] ${level}: ${message}${
                trace ? `\n${trace}` : ''
              }`;
            }),
          ),
        }),
        new DailyRotateFile({
          filename: './logs/log-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '7d',
        }),
      ],
    });
  }

  public setContext(context: string) {
    this.context = context;
  }

  public getWinstonLogger(): Logger {
    return this.logger;
  }

  public log(message: any, context?: string): Logger {
    context = context || this.context;

    if (!!message && 'object' === typeof message) {
      const { message: msg, level = 'info', ...meta } = message;

      return this.logger.log(level, msg as string, { context, ...meta });
    }

    return this.logger.info(message, { context });
  }

  public fatal(message: any, trace?: string, context?: string): Logger {
    context = context || this.context;

    if (message instanceof Error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { message: msg, name, stack, ...meta } = message;

      return this.logger.log({
        level: 'fatal',
        message: msg,
        context,
        stack: [trace || stack],
        error: message,
        ...meta,
      });
    }

    if (!!message && 'object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.error({
        level: 'fatal',
        message: msg,
        context,
        stack: [trace],
        ...meta,
      });
    }

    return this.logger.error({
      level: 'fatal',
      message,
      context,
      stack: [trace],
    });
  }

  public error(message: any, trace?: string, context?: string): Logger {
    context = context || this.context;

    if (message instanceof Error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { message: msg, name, stack, ...meta } = message;

      return this.logger.error(msg, {
        context,
        stack: [trace || message.stack],
        error: message,
        ...meta,
      });
    }

    if (!!message && 'object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.error(msg as string, {
        context,
        stack: [trace],
        ...meta,
      });
    }

    return this.logger.error(message, { context, stack: [trace] });
  }

  public warn(message: any, context?: string): Logger {
    context = context || this.context;

    if (!!message && 'object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.warn(msg as string, { context, ...meta });
    }

    return this.logger.warn(message, { context });
  }

  public debug?(message: any, context?: string): Logger {
    context = context || this.context;

    if (!!message && 'object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.debug(msg as string, { context, ...meta });
    }

    return this.logger.debug(message, { context });
  }

  public verbose?(message: any, context?: string): Logger {
    context = context || this.context;

    if (!!message && 'object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.verbose(msg as string, { context, ...meta });
    }

    return this.logger.verbose(message, { context });
  }
}
