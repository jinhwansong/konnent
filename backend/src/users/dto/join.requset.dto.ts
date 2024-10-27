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
export class SnsJoinRequestDto extends PickType(Users, [
  'snsId',
  'name',
  'nickname',
  'phone',
  'image',
  'socialLoginProvider',
]) {}
