import { IntersectionType, PickType } from '@nestjs/swagger';
import { AvailableSchedule } from 'src/entities/AvailableSchedule';
import { MentoringPrograms } from 'src/entities/MentoringPrograms';

// 프로그램 생성
export class MentoingProgramCreateDto extends IntersectionType(
  PickType(MentoringPrograms, ['title', 'content', 'price', 'duration']),
  PickType(AvailableSchedule, ['breakTime', 'availableSchedule']),
) {}
// 프로그램 수정 조회
export class MentoingProgramDto extends IntersectionType(
  PickType(MentoringPrograms, [
    'title',
    'content',
    'price',
    'duration',
    'status',
    'averageRating',
    'totalRatings',
  ]),
  PickType(AvailableSchedule, ['breakTime', 'availableSchedule']),
) {}
