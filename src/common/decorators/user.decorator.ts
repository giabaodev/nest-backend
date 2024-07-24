import { AuthGuard } from '@/modules/auth/guard/auth.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';

export function UserProtected(): MethodDecorator {
  return applyDecorators(UseGuards(AuthGuard));
}
