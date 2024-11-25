import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class MentorRequestDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: '연락받을 이메일 주소',
    required: true,
  })
  public email: string;
  @ApiProperty({
    example: '데이터사이언스',
    description: '멘토링 희망분야',
    required: true,
  })
  public job: string;
  @ApiProperty({
    example: '주니어(1~3년)',
    description: '경력',
    required: true,
  })
  public career: string;
  @ApiProperty({
    example:
      '"저는 프론트엔드 개발자로 5년간 일해왔으며, 이제 후배 개발자들에게 저의 경험을 나누고 싶습니다."',
    description: '자기소개',
    required: true,
  })
  public introduce: string;
  @ApiProperty({
    example: 'example@gmail.com',
    description: '포트폴리오 페이지',
    required: true,
  })
  public portfolio: string;
}
// 멘토 승인/거절 DTO
export class MentorApprovalDto {
  @ApiProperty({
    example: true,
    description: '승인 여부',
  })
  @IsBoolean()
  approved: boolean;

  @ApiProperty({
    example: '자격요건 미달',
    description: '거절 사유 (거절시에만 필요)',
    required: false,
  })
  @IsString()
  @IsOptional()
  reason?: string;
}
