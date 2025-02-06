import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from './page.dto';
import { ApiProperty } from '@nestjs/swagger';
import { MentoingProgramDto } from 'src/program/dto/program.request.dto';
import { UserProgram } from 'src/programs/dto/program.request';

export class SearchDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: '검색어' })
  keyword?: string;
  @IsOptional()
  @IsEnum(['price', 'title', 'latest'])
  @ApiProperty({ description: '정렬 기준', default: 'latest' })
  sort?: string = 'latest';
}

export class ProgramListDto extends PaginationDto {
  @ApiProperty({ type: [MentoingProgramDto] })
  items: MentoingProgramDto[];
}
export enum SortType {
  RECENT = 'latest',
  POPULAR = 'popular',
}
export class ProgramRequestDto extends PaginationDto {
  @IsOptional()
  @IsEnum(SortType)
  @ApiProperty({
    description: '정렬기준 (최신순/인기순)',
    required: false,
    enum: SortType,
    default: SortType.RECENT,
  })
  sort?: string = SortType.RECENT;
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: '멘토링 분야',
    required: false,
    example: 'IT개발/데이터',
  })
  mentoring_field?: string;
}

export class UserListDto extends PaginationDto {
  @ApiProperty({ type: [UserProgram] })
  items: UserProgram[];
}
