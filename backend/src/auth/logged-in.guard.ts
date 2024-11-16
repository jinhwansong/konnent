import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoggedInGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('Cookies:', request.cookies);
    console.log('Session:', request.session);
    console.log('User:', request.user);
    console.log('isAuthenticated:', request.isAuthenticated());
    return request.isAuthenticated();
  }
}
