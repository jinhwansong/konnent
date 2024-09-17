import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  postUser(
    email: string,
    password: string,
    name: string,
    nickname: string,
    phone: number,
  ){};
}
