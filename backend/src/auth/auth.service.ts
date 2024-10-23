import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}
  async validateUser(email: string, password: string) {
    // 서비스에서 이메일을 비교하던지 아니면 레포지토리에서 이메일을 비교하던지 둘중 하나.
    // const user = await this.usersService.findByEmail(email);
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'name', 'nickname', 'image', 'role', 'password'], // select로 columns만 가져오기.
    });
    // console.log(email, password, user);
    if (!user) {
      return null;
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      // 패스워드를 빼고 나머지에 대한 데이터 가져오기.
      const { password, ...userWithoutpassword } = user;
      return userWithoutpassword;
    }
    return null;
  }
}
