import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/enum/status.enum';
import { Mentors } from 'src/entities/Mentors';
import { UserRole, Users } from 'src/entities/Users';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Mentors)
    private readonly mentorRepository: Repository<Mentors>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly dataSource: DataSource,
  ) {}
  // 멘토 승인/거절
  async approveMentor(MentorId: number, approved: boolean, reason?: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const Mentor = await queryRunner.manager.getRepository(Mentors).findOne({
        where: { id: MentorId },
        relations: ['users'],
        select: ['id', 'status', 'users'],
      });
      if (!Mentor) {
        throw new BadRequestException('멘토 신청 정보를 찾을 수 없습니다.');
      }
      if (Mentor.status !== Status.PENDING) {
        throw new BadRequestException('이미 처리된 멘토 신청입니다.');
      }
      // 멘토 신청 상태 업데이트
      await queryRunner.manager.update(
        Mentors,
        { id: MentorId },
        {
          status: approved ? Status.APPROVED : Status.REJECTED,
          reason: !approved ? reason : null,
        },
      );
      // 유저 등급 변경
      if (approved) {
        await queryRunner.manager.update(
          Users,
          { id: Mentor.users.id },
          { role: UserRole.Mentor },
        );
      }
      await queryRunner.commitTransaction();
      return {
        message: approved
          ? '멘토 승인이 완료되었습니다.'
          : '멘토 신청을 거절되었습니다.',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        '멘토 승인/거절 처리 중 오류가 발생했습니다.',
      );
    } finally {
      await queryRunner.release();
    }
  }

  // 멘토 신청목록
  async getApplications(pages: number = 1, limit: number = 10) {
    try {
      const queryBuilder = this.mentorRepository
        .createQueryBuilder('mentor')
        .leftJoinAndSelect('mentor.users', 'users') // user 테이블과 조인
        .select([
          'mentor.id',
          'users.name',
          'users.image',
          'mentor.email',
          'mentor.job',
          'mentor.career',
          'mentor.status',
          'mentor.createdAt',
        ])
        .orderBy('mentor.createdAt', 'DESC');

      // 페이지 네이션 적용
      const skip = (pages - 1) * limit;
      queryBuilder.skip(skip).take(limit);

      // 데이터와 전체 개수 조회
      const [results, total] = await queryBuilder.getManyAndCount();
      const page = results.map((mentor) => ({
        id: mentor.id,
        name: mentor.users.name,
        image: mentor.users.image,
        email: mentor.email,
        job: mentor.job,
        career: mentor.career,
        status: mentor.status,
        createdAt: mentor.createdAt,
      }));
      return {
        page,
        totalPage: Math.ceil(total / limit),
        message: '멘토 신청 목록을 조회했습니다.',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        '멘토 신청 목록 조회 중 오류가 발생했습니다.',
      );
    }
  }
  // 멘토 신청 상세페이지
  async findOneApplicationDetail(id: number) {
    try {
      const Mentor = await this.mentorRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!Mentor) {
        throw new BadRequestException(
          '조회하신 멘토 신청 정보를 찾을 수 없습니다.',
        );
      }
      return {
        id: Mentor.id,
        name: Mentor.users.name,
        nickname: Mentor.users.nickname,
        phone: Mentor.users.phone,
        email: Mentor.email,
        job: Mentor.job,
        career: Mentor.career,
        introduce: Mentor.introduce,
        portfolio: Mentor.portfolio,
        status: Mentor.status,
        createdAt: Mentor.createdAt,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        '멘토 신청 상세 정보 조회 중 오류가 발생했습니다.',
      );
    }
  }
  // 사용자 목록
  async findAllUser(pages: number = 1, limit: number = 10) {
    try {
      const queryBuilder = this.userRepository
        .createQueryBuilder('user')
        .select([
          'user.id',
          'user.email',
          'user.name',
          'user.phone',
          'user.image',
          'user.nickname',
          'user.role',
          'user.snsId',
          'user.createdAt',
        ])
        .orderBy('user.createdAt', 'DESC');
      // 페이지 네이션 적용
      const skip = (pages - 1) * limit;
      queryBuilder.skip(skip).take(limit);

      // 데이터와 전체 개수 조회
      const [page, total] = await queryBuilder.getManyAndCount();
      return {
        page,
        totalPage: Math.ceil(total / limit),
        message: '사용자 목록을 조회했습니다.',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        '사용자 목록 조회 중 오류가 발생했습니다.',
      );
    }
  }
}
