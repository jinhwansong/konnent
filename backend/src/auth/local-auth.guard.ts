import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const can = await super.canActivate(context);
    console.log(can);
    if (can) {
      const req = context.switchToHttp().getRequest();
      console.log(req);
      await super.logIn(req);
    }
    return true;
  }
}
