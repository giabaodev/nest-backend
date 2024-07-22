import { Request } from 'express';

export interface HttpRequest extends Request {
  user?: Record<string, unknown>;
}
