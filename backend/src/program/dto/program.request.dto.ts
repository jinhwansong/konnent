import { IntersectionType, PickType } from '@nestjs/swagger';
import { AvailableSchedule } from 'src/entities/AvailableSchedule';
import { MentoringPrograms } from 'src/entities/MentoringPrograms';

// 프로그램 생성
export class MentoingProgramCreateDto extends IntersectionType(
  PickType(MentoringPrograms, [
    'title',
    'content',
    'price',
    'duration',
    'mentoring_field',
  ]),
  PickType(AvailableSchedule, ['available_schedule']),
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
  PickType(AvailableSchedule, ['available_schedule']),
) {}
