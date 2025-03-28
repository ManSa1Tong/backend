import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const OAuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // OAuth 정보 전체
  },
);
