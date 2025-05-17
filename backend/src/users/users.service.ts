import { Users } from '@/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}
  // 회원가입
  async createUser(body: Partial<Users>) {
    const user = this.userRepository.create(body);
    this.userRepository.save(user);
    return { message: '회원가입이 완료되었습니다.' };
  }
  // 이메일 중복확인
  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
  // 프로필 조회
  async profile(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    return {
      message: '사용자 정보 입니다.',
      email: user.email,
      name: user.name,
      nickname: user.nickname,
      phone: user.phone,
      image: user.image,
      role: user.role,
    };
  }
}
