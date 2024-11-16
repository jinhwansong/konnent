import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { Users } from 'src/entities/Users';

@Injectable()
export class UsersService {
  // 레포지토리 : 테이블(db)와 엔티티를 이어준다.
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private dataSource: DataSource,
  ) {}
  async findByEmail(phone: string) {
    return this.userRepository.findOne({
      where: { phone },
      select: ['phone'],
    });
  }
  async Join(
    email: string,
    password: string,
    name: string,
    nickname: string,
    phone: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
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
    // 중복사용자
    const user = await queryRunner.manager.getRepository(Users).findOne({
      where: { email },
    });
    if (user) {
      throw new UnauthorizedException('이미 존재하는 사용자입니다');
    }
    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 12);
    try {
      // 회원가입
      await queryRunner.manager.getRepository(Users).save({
        email,
        password: hashedPassword,
        name,
        nickname,
        phone,
      });
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
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
