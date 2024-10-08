import { PickType } from '@nestjs/swagger';
import { Users } from 'src/entities/Users';

export class JoinRequestDto extends PickType(Users, [
  'email',
  'password',
  'name',
  'nickname',
  'phone',
] as const) {}
