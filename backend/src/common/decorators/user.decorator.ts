import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//저장된 사용자 정보에 접근 가능
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const res = ctx.switchToHttp().getRequest();
    return res.user;
  },
);
