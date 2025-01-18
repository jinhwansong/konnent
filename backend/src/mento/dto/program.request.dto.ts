import { PickType } from '@nestjs/swagger';
import { MentoringPrograms } from 'src/entities/MentoringPrograms';

// 프로그램 생성
export class MentoingProgramCreateDto extends PickType(MentoringPrograms, [
  'title',
  'content',
  'price',
  'duration',
]) {}
// 프로그램 수정 조회
export class MentoingProgramDto extends PickType(MentoringPrograms, [
  'title',
  'content',
  'price',
  'duration',
  'status',
]) {}
// 프로그램 예약 가능 날짜
