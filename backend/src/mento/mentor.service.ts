import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/enum/status.enum';
import { Mentors } from 'src/entities/Mentors';
import { Users } from 'src/entities/Users';
import { DataSource, In, Repository } from 'typeorm';

@Injectable()
export class MentorService {
  // 테이블과 엔티티 이어주기.
  constructor(
    @InjectRepository(Mentors)
    private readonly MentorRepository: Repository<Mentors>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly dataSource: DataSource,
  ) {}
  // 멘토신청
  async MentorApplication(
    userId: number,
    email: string,
    job: string,
    introduce: string,
    portfolio: string,
    career: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    // db 연결
    await queryRunner.connect();
    // 트랜잭션 시작
    await queryRunner.startTransaction();
    if (!email) {
      throw new BadRequestException('이메일을 작성해주세요');
    }
    if (!job) {
      throw new BadRequestException('희망분야를 선택해주세요');
    }
    if (!introduce) {
      throw new BadRequestException('멘토님의 소개를입력해주세요');
    }
    if (!portfolio) {
      throw new BadRequestException('포트폴리오 링크를 입력해주세요');
    }
    if (!career) {
      throw new BadRequestException('멘토님의 경력을 선택해주세요');
    }
    try {
      // 멘토인지 아닌지 여부
      const Mentor = await queryRunner.manager.getRepository(Mentors).findOne({
        where: {
          users: { id: userId },
          status: In([Status.PENDING, Status.APPROVED]),
        },
        order: { createdAt: 'DESC' },
      });

      if (Mentor) {
        if (Mentor.status === Status.PENDING) {
          throw new BadRequestException('이미 멘토 신청을 하셨습니다');
        }
        if (Mentor.status === Status.APPROVED) {
          throw new BadRequestException('이미 승인된 멘토입니다.');
        }
      }
      // 떨어졋을시 재 신청기간
      const rejected = await queryRunner.manager
        .getRepository(Mentors)
        .findOne({
          where: {
            users: { id: userId },
            status: In([Status.REJECTED]),
          },
          order: { createdAt: 'DESC' },
        });
      // 3일후 신청가능
      if (rejected) {
        const days = 3;
        const canDate = new Date(rejected.updatedAt);
        canDate.setDate(canDate.getDate() + days);
        if (new Date() < canDate) {
          throw new BadRequestException(
            `재신청은 거절 후 ${days}일 이후에 가능합니다.` +
              `재신청 가능일은 : ${canDate.toLocaleDateString()}`,
          );
        }
      }
      await queryRunner.manager.getRepository(Mentors).save({
        email,
        job,
        introduce,
        portfolio,
        career,
        users: { id: userId },
        status: Status.PENDING,
      });
      await queryRunner.commitTransaction();
      return { message: '멘토신청이 완료되었습니다.' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
