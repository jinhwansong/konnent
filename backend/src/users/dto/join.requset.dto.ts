import { PickType } from '@nestjs/swagger';
import { Users } from 'src/entities/Users';

export class JoinRequestDto extends PickType(Users, [
  'id',
  'email',
  'password',
  'name',
  'nickname',
  'phone',
  'role',
] as const) {}
