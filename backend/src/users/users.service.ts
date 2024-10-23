import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { Users } from 'src/entities/Users';

@Injectable()
export class UsersService {
  // 레포지토리 : 테이블(db)와 엔티티를 이어준다.
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}
  getUser() {}
  async Join(
    email: string,
    password: string,
    name: string,
    nickname: string,
    phone: string,
  ) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!email) {
      throw new BadRequestException('이메일을 작성해주세요');
    }
    if (!password) {
      throw new BadRequestException('비밀번호를 작성해주세요');
    }
    if (!name) {
      throw new BadRequestException('이름을 작성해주세요');
    }
    if (!nickname) {
      throw new BadRequestException('닉네임을 작성해주세요');
    }
    if (!phone) {
      throw new BadRequestException('휴대폰번호를 작성해주세요');
    }
    if (user) {
      throw new UnauthorizedException('이미 존재하는 사용자입니다');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await this.userRepository.save({
      email,
      password: hashedPassword,
      name,
      nickname,
      phone,
    });
  }
  async checkEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('이메일 형식이 올바르지 않습니다.');
    }
    if (user) {
      throw new BadRequestException('중복된 이메일이 존재합니다');
    }
    return { message: '사용 가능한 이메일 입니다.' };
  }
  async checkNickname(nickname: string) {
    const user = await this.userRepository.findOne({ where: { nickname } });
    const nameRegex = /^[가-힣a-zA-Z]{2,7}$/;

    if (!nameRegex.test(nickname)) {
      throw new BadRequestException('2글자 이상 7글자 이하로 작성해주세요');
    }
    if (user) {
      throw new BadRequestException('중복된 닉네임이 존재합니다');
    }
    return { message: '사용 가능한 닉네임 입니다.' };
  }
}
