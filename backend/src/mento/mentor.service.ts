import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/enum/status.enum';
import { MentorProfile } from 'src/entities/MentorProfile';
import { Mentors } from 'src/entities/Mentors';
import { DataSource, In, Repository } from 'typeorm';
import {
  UpdateCareerDto,
  UpdateCompanyDto,
  UpdateIntroduceDto,
  UpdateJobDto,
} from './dto/update.profile.dto';
import { MentorRequestDto } from './dto/mentor.request.dto';
import {
  MentoingProgramCreateDto,
  MentoingProgramDto,
} from './dto/program.request.dto';
import { MentoringPrograms } from 'src/entities/MentoringPrograms';

@Injectable()
export class MentorService {
  // 테이블과 엔티티 이어주기.
  constructor(
    @InjectRepository(Mentors)
    private readonly mentorRepository: Repository<Mentors>,
    @InjectRepository(MentorProfile)
    private readonly mentorProfileRepository: Repository<MentorProfile>,
    @InjectRepository(MentoringPrograms)
    private readonly mentorProgramRepository: Repository<MentoringPrograms>,
    private readonly dataSource: DataSource,
  ) {}
  // 멘토신청
  async mentorApplication(body: MentorRequestDto, userId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    // db 연결
    await queryRunner.connect();
    // 트랜잭션 시작
    await queryRunner.startTransaction();
    if (!body.email) {
      throw new BadRequestException('이메일을 작성해주세요');
    }
    if (!body.job) {
      throw new BadRequestException('희망분야를 선택해주세요');
    }
    if (!body.introduce) {
      throw new BadRequestException('멘토님의 소개를입력해주세요');
    }
    if (!body.portfolio) {
      throw new BadRequestException('포트폴리오 링크를 입력해주세요');
    }
    if (!body.career) {
      throw new BadRequestException('멘토님의 경력을 선택해주세요');
    }
    try {
      // 멘토인지 아닌지 여부
      const Mentor = await queryRunner.manager.getRepository(Mentors).findOne({
        where: {
          user: { id: userId },
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
            user: { id: userId },
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
            `재신청은 거절 후 ${days}일 이후에 가능합니다. \n` +
              `재신청 가능일은 : ${canDate.toLocaleDateString()}`,
          );
        }
      }
      await queryRunner.manager.getRepository(Mentors).save({
        body,
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
  // 멘토 프로필 정보
  async getMentor(id: number) {
    try {
      if (!id) {
        return null;
      }
      // 멘토 정보 조회
      const mentor = await this.mentorRepository.findOne({
        where: { user: { id } },
        relations: ['user'],
      });
      if (!mentor) {
        throw new BadRequestException('멘토 정보를 찾을 수 없습니다.');
      }
      // 프로필 조회
      let profile = await this.mentorProfileRepository.findOne({
        where: { mentor: { id: mentor.id } },
        relations: ['mentor'],
      });
      // 프로필이 없는 경우
      if (!profile) {
        profile = await this.mentorProfileRepository.save({
          mentor,
          introduce: '',
          company: '',
          image: null,
        });
      }
      return {
        job: mentor.job,
        career: mentor.career,
        introduce: profile.introduce,
        company: profile.company,
        image: profile.image,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        '멘토님의 정보를 찾던 도중 오류가 발생했습니다.',
      );
    }
  }
  // 멘토 회사명 변경
  async updateCompany(body: UpdateCompanyDto, id: number) {
    try {
      // 멘토 정보 조회
      const mentor = await this.mentorRepository.findOne({
        where: { user: { id } },
        relations: ['user'],
      });
      if (!mentor) {
        throw new BadRequestException('멘토 정보를 찾을 수 없습니다.');
      }
      // 프로필 조회
      const profile = await this.mentorProfileRepository.findOne({
        where: { mentor: { id: mentor.id } },
        relations: ['mentor'],
      });
      await this.mentorProfileRepository.update(
        { id: profile.id },
        {
          company: body.company,
        },
      );
      const updatedProfile = await this.mentorProfileRepository.findOne({
        where: { mentor: { id: mentor.id } },
        relations: ['mentor'],
      });
      return {
        message: '멘토님의 회사명이 변경되었습니다.',
        company: updatedProfile.company,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        '멘토님의 회사명을 변경 중 오류가 발생했습니다.',
      );
    }
  }
  // 멘토 자기소개 변경
  async updateIntroduce(body: UpdateIntroduceDto, id: number) {
    try {
      // 멘토 정보 조회
      const mentor = await this.mentorRepository.findOne({
        where: { user: { id } },
        relations: ['user'],
      });
      if (!mentor) {
        throw new BadRequestException('멘토 정보를 찾을 수 없습니다.');
      }
      // 프로필 조회
      const profile = await this.mentorProfileRepository.findOne({
        where: { mentor: { id: mentor.id } },
        relations: ['mentor'],
      });
      this.mentorProfileRepository.update(
        { id: profile.id },
        {
          introduce: body.introduce,
        },
      );
      const updatedProfile = await this.mentorProfileRepository.findOne({
        where: { mentor: { id: mentor.id } },
        relations: ['mentor'],
      });
      return {
        message: '멘토님의 자기소개가 변경되었습니다.',
        introduce: updatedProfile.introduce,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        '자기소개 변경 중 오류가 발생했습니다.',
      );
    }
  }
  // 멘토 자기소개 이미지 처리
  async uploadImage(files: Array<Express.Multer.File>, id: number) {
    try {
      // 멘토 정보 조회
      const mentor = await this.mentorRepository.findOne({
        where: { user: { id } },
        relations: ['user'],
      });
      if (!mentor) {
        throw new BadRequestException('멘토 정보를 찾을 수 없습니다.');
      }
      const fileUrls = files.map((file) => `/uploads/${file.filename}`);
      return { url: fileUrls };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        '자기소개 이미지 업로드 중 오류가 발생했습니다.',
      );
    }
  }
  // 프로필이미지 변경
  async updateProfile(file: Express.Multer.File, id: number) {
    try {
      if (!file) {
        throw new BadRequestException('업로드된 파일이 없습니다.');
      }
      // 멘토 정보 조회
      const mentor = await this.mentorRepository.findOne({
        where: { user: { id } },
        relations: ['user'],
      });
      if (!mentor) {
        throw new BadRequestException('멘토 정보를 찾을 수 없습니다.');
      }
      // 프로필 조회
      const profile = await this.mentorProfileRepository.findOne({
        where: { mentor: { id: mentor.id } },
        relations: ['mentor'],
      });
      const imageUrl = `/uploads/${file.filename}`;

      await this.mentorProfileRepository.update(
        { id: profile.id },
        {
          image: imageUrl,
        },
      );
      const updatedProfile = await this.mentorProfileRepository.findOne({
        where: { mentor: { id: mentor.id } },
        relations: ['mentor'],
      });
      return {
        message: '프로필이미지가 변경되었습니다.',
        image: updatedProfile.image,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        '파일 업로드 중 오류가 발생했습니다.',
      );
    }
  }
  // 멘토링 희망분야 변경
  async updateJob(body: UpdateJobDto, id: number) {
    try {
      const mentor = await this.mentorRepository.findOne({
        where: { user: { id } },
        relations: ['user'],
      });
      if (!mentor) {
        throw new BadRequestException('멘토 정보를 찾을 수 없습니다.');
      }
      await this.mentorRepository.update({ id: mentor.id }, { job: body.job });
      const updatedMentor = await this.mentorRepository.findOne({
        where: { user: { id } },
        relations: ['user'],
      });
      return {
        message: '멘토링 희망분야가 변경되었습니다.',
        job: updatedMentor.job,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        '멘토링 희망분야 변경 중 오류가 발생했습니다.',
      );
    }
  }
  // 멘토 경력 변경
  async updateCareer(body: UpdateCareerDto, id: number) {
    try {
      const mentor = await this.mentorRepository.findOne({
        where: { user: { id } },
        relations: ['user'],
      });
      if (!mentor) {
        throw new BadRequestException('멘토 정보를 찾을 수 없습니다.');
      }
      await this.mentorRepository.update(
        { id: mentor.id },
        {
          career: body.career,
        },
      );
      const updatedMentor = await this.mentorRepository.findOne({
        where: { user: { id } },
        relations: ['user'],
      });
      return {
        message: '멘토 경력이 변경되었습니다.',
        career: updatedMentor.career,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        '멘토님의 경력 변경 중 오류가 발생했습니다.',
      );
    }
  }
  // 멘토링 프로그램 등록
  async createProgram(body: MentoingProgramCreateDto, id: number) {
    try {
      const mentor = await this.mentorRepository.findOne({
        where: { user: { id } },
        relations: ['user'],
      });
      if (!mentor) {
        throw new BadRequestException('멘토 정보를 찾을 수 없습니다.');
      }
      const newProgram = await this.mentorProgramRepository.create({
        ...body,
        profile: { id: mentor.id },
      });
      await this.mentorProgramRepository.save(newProgram);
      return { massage: '멘토님의 프로그램이 등록되었습니다.' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        '멘토님의 프로그램 등록 중 오류가 발생했습니다.',
      );
    }
  }
  // 멘토링 프로그램 수정
  async updateProgram(body: MentoingProgramDto, id: number, programId: number) {
    try {
      const mentor = await this.mentorRepository.findOne({
        where: { user: { id } },
        relations: ['user'],
      });
      if (!mentor) {
        throw new BadRequestException('멘토 정보를 찾을 수 없습니다.');
      }
      const program = await this.mentorProgramRepository.findOne({
        where: { id: programId },
        relations: ['profile'],
      });
      if (!program) {
        throw new BadRequestException('해당 프로그램을 찾을 수 없습니다.');
      }
      if (program.profile.id !== mentor.id) {
        throw new BadRequestException('프로그램을 수정할 권한이 없습니다.');
      }
      await this.mentorProgramRepository.update(programId, body);
      return { id: programId, massage: '멘토님의 프로그램이 수정되었습니다.' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        '멘토님의 프로그램 수정 중 오류가 발생했습니다.',
      );
    }
  }
  // 멘토링 프로그램 삭제
  async deleteProgram(id: number, programId: number) {
    try {
      const mentor = await this.mentorRepository.findOne({
        where: { user: { id } },
        relations: ['user'],
      });
      if (!mentor) {
        throw new BadRequestException('멘토 정보를 찾을 수 없습니다.');
      }
      const program = await this.mentorProgramRepository.findOne({
        where: { id: programId },
        relations: ['profile'],
      });
      if (!program) {
        throw new BadRequestException('해당 프로그램을 찾을 수 없습니다.');
      }
      if (program.profile.id !== mentor.id) {
        throw new BadRequestException('프로그램을 삭제할 권한이 없습니다.');
      }
      await this.mentorProgramRepository.delete(programId);
      return { massage: '멘토님의 프로그램이 삭제되었습니다.' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        '멘토님의 프로그램 삭제 중 오류가 발생했습니다.',
      );
    }
  }
  // 멘토링 프로그램 조회
  async getProgram(id: number, pages: number = 1, limit: number = 10) {
    try {
      const mentor = await this.mentorRepository.findOne({
        where: { user: { id } },
        relations: ['user'],
      });
      if (!mentor) {
        throw new BadRequestException('멘토 정보를 찾을 수 없습니다.');
      }
      const program = await this.mentorProgramRepository
        .createQueryBuilder('program')
        .leftJoinAndSelect('program.profile', 'profile')
        .where('program.id = :mentorId', { mentorId: mentor.id })
        .orderBy('program.createAt', 'DESC')
        .select([
          'program.id',
          'program.title',
          'program.price',
          'program.duration',
          'program.status',
          'program.createdAt',
        ])
        .skip((pages - 1) * limit)
        .take(limit);
      // 데이터와 전체 개수 조회
      const [results, total] = await program.getManyAndCount();
      const page = results.map((result) => ({
        id: result.id,
        title: result.title,
        price: result.price,
        duration: result.duration,
        status: result.status,
        createdAt: result.createdAt,
      }));
      return {
        page,
        totalPage: Math.ceil(total / limit),
        message: '멘토님의 프로그램 목록을 조회했습니다.',
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        '멘토님의 프로그램 삭제 중 오류가 발생했습니다.',
      );
    }
  }
}
