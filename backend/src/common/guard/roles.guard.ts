import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../enum/status.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 권한 메타데이터 획득
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    const user = context.switchToHttp().getRequest().user;
    // console.log('내 권한은?', roles);
    // console.log('내 권한은?머냐?', user.role);
    return roles.includes(user.role);
  }
}
