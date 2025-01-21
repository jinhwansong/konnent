import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/page.dto';
import { SearchDto } from 'src/common/dto/search.dto';
import { MentoringPrograms } from 'src/entities/MentoringPrograms';
import { MentorProfile } from 'src/entities/MentorProfile';
import {
  MentoingProgramCreateDto,
  MentoingProgramDto,
} from 'src/program/dto/program.request.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(MentorProfile)
    private readonly mentorProfileRepository: Repository<MentorProfile>,
    @InjectRepository(MentoringPrograms)
    private readonly mentorProgramRepository: Repository<MentoringPrograms>,
  ) {}
  // 멘토링 프로그램 등록
  async create(body: MentoingProgramCreateDto, id: number) {
    try {
      console.log(body);
      // 프로필 조회
      const profile = await this.mentorProfileRepository.findOne({
        where: { userId: id },
        relations: ['user'],
      });
      if (!profile) {
        throw new BadRequestException('멘토 정보를 찾을 수 없습니다.');
      }
      const newProgram = await this.mentorProgramRepository.create({
        ...body,
        profile,
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
  async update(body: MentoingProgramDto, id: number, programId: number) {
    try {
      // 프로필 조회
      const profile = await this.mentorProfileRepository.findOne({
        where: { userId: id },
        relations: ['user'],
      });
      if (!profile) {
        throw new BadRequestException('멘토 정보를 찾을 수 없습니다.');
      }
      const program = await this.mentorProgramRepository.findOne({
        where: { id: programId },
        relations: ['profile'],
      });
      console.log('프로그램 수정', program);
      if (!program) {
        throw new BadRequestException('해당 프로그램을 찾을 수 없습니다.');
      }
      if (program.profile.id !== program.id) {
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
  async delete(id: number, programId: number) {
    try {
      // 프로필 조회
      const profile = await this.mentorProfileRepository.findOne({
        where: { userId: id },
        relations: ['user'],
      });
      if (!profile) {
        throw new BadRequestException('멘토 정보를 찾을 수 없습니다.');
      }
      const program = await this.mentorProgramRepository.findOne({
        where: { id: programId },
        relations: ['profile'],
      });
      if (!program) {
        throw new BadRequestException('해당 프로그램을 찾을 수 없습니다.');
      }
      if (program.profile.id !== program.id) {
        throw new BadRequestException('프로그램을 수정할 권한이 없습니다.');
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
  async get(id: number, { page = 1, limit = 10 }: PaginationDto) {
    try {
      // 프로필 조회
      const profile = await this.mentorProfileRepository.findOne({
        where: { userId: id },
        relations: ['user'],
      });
      if (!profile) {
        throw new BadRequestException('멘토 정보를 찾을 수 없습니다.');
      }
      const program = await this.mentorProgramRepository
        .createQueryBuilder('program')
        .where('program.profileId = :profileId', { profileId: profile.id })
        .orderBy('program.createdAt', 'DESC')
        .select([
          'program.id',
          'program.title',
          'program.price',
          'program.duration',
          'program.status',
          'program.createdAt',
        ])
        .skip((page - 1) * limit)
        .take(limit);
      // 데이터와 전체 개수 조회
      const [results, total] = await program.getManyAndCount();
      const items = results.map((result) => ({
        id: result.id,
        title: result.title,
        price: result.price,
        duration: result.duration,
        status: result.status,
        createdAt: result.createdAt,
      }));
      return {
        items,
        totalPage: Math.ceil(total / limit),
        message: '멘토님의 프로그램 목록을 조회했습니다.',
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException(
        '멘토님의 프로그램 조회 중 오류가 발생했습니다.',
      );
    }
  }
  // 멘토링 프로그램 상세 조회
  async detail(id: number, programId: number) {
    // 프로필 조회
    const profile = await this.mentorProfileRepository.findOne({
      where: { userId: id },
      relations: ['user'],
    });
    if (!profile) {
      throw new BadRequestException('멘토 정보를 찾을 수 없습니다.');
    }
    const program = await this.mentorProgramRepository.findOne({
      where: { id: programId },
      relations: ['profile'],
    });
    if (!program) {
      throw new BadRequestException('해당 프로그램을 찾을 수 없습니다.');
    }
    return {
      id: program.id,
      title: program.title,
      content: program.content,
      duration: program.duration,
      price: program.price,
      status: program.status,
      createdAt: program.createdAt,
    };
  }
  // 멘토링 프로그램 검색
  async search(
    id: number,
    { page = 1, limit = 10, keyword, sort = 'latest' }: SearchDto,
  ) {
    // 프로필 조회
    const profile = await this.mentorProfileRepository.findOne({
      where: { userId: id },
      relations: ['user'],
    });
    if (!profile) {
      throw new BadRequestException('멘토 정보를 찾을 수 없습니다.');
    }
    // 멘토의 모든 프로그램을 꺼냄
    const program = await this.mentorProgramRepository
      .createQueryBuilder('program')
      .where('program.profileId = :profileId', { profileId: profile.id });
    if (keyword) {
      program.andWhere(
        '(program.title LIKE :keyword OR program.content LIKE :keyword)',
        { keyword: `%${keyword}%` },
      );
    }
    if (sort) {
      switch (sort) {
        case 'latest':
          program.orderBy('program.createAt', 'DESC');
        case 'price':
          program.orderBy('program.price', 'ASC');
        default:
          program.orderBy('program.title', 'ASC');
      }
    }
    program.skip((page - 1) * limit).take(limit);
    // 데이터와 전체 개수 조회
    const [results, total] = await program.getManyAndCount();
    const items = results.map((result) => ({
      id: result.id,
      title: result.title,
      price: result.price,
      duration: result.duration,
      status: result.status,
      createdAt: result.createdAt,
    }));
    return {
      items,
      totalPage: Math.ceil(total / limit),
      message: '멘토님의 프로그램 목록을 조회했습니다.',
    };
  }
}
