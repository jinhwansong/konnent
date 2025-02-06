import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramRequestDto } from 'src/common/dto/search.dto';
import { MentoringPrograms } from 'src/entities/MentoringPrograms';
import { Repository } from 'typeorm';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(MentoringPrograms)
    private readonly mentorProgramRepository: Repository<MentoringPrograms>,
  ) {}
  // 프로그램 가져오기
  async get({
    page = 1,
    limit = 10,
    sort = 'latest',
    mentoring_field,
  }: ProgramRequestDto) {
    try {
      const program = await this.mentorProgramRepository
        .createQueryBuilder('program')
        .leftJoinAndSelect('program.profile', 'profile')
        .leftJoinAndSelect('profile.user', 'user')
        .leftJoinAndSelect('user.mentor', 'mentor')
        .select([
          'program.id',
          'program.title',
          'program.mentoring_field',
          'program.averageRating',
          'program.totalRatings',
          'program.createdAt',
          'user.name',
          'profile.company',
          'profile.position',
          'profile.image',
          'mentor.career',
        ]);
      // 멘토링 분야 필터링
      if (mentoring_field !== 'all') {
        program.andWhere('program.mentoring_field = :mentoring_field', {
          mentoring_field,
        });
      }
      // 정렬
      if (sort) {
        switch (sort) {
          case 'latest':
            program.orderBy('program.createdAt', 'DESC');
            break;
          default:
            program.orderBy('program.title', 'ASC');
            break;
        }
      }
      // 데이터와 전체 개수 조회
      const [results, total] = await program
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();
      if (total === 0) {
        return {
          items: [],
          totalPage: 0,
          message: '검색 결과가 없습니다',
        };
      }
      const items = results.map((item) => ({
        id: item.id,
        title: item.title,
        mentoring_field: item.mentoring_field,
        averageRating: item.averageRating,
        company: item.profile.company,
        position: item.profile.position,
        image: item.profile.image,
        career: item.profile.user.mentor.career,
        name: item.profile.user.name,
        totalRatings: item.totalRatings,
      }));
      return {
        items,
        totalPage: Math.ceil(total / limit),
        message: '프로그램 목록을 불러왔습니다.',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        '프로그램 목록을 불러오는 중 오류가 발생했습니다.',
      );
    }
  }
}
