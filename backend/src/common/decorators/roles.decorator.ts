import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/entities/Users';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
