import { ApiProperty } from '@nestjs/swagger';

export class mentoRequsetDto {
  @ApiProperty({
    example: '프론트엔드개발',
    description: '멘토 직무',
    required: true,
  })
  public office: string;
  @ApiProperty({
    example: '네카라쿠베',
    description: '멘토 현직',
    required: true,
  })
  public currentJob: string;
  @ApiProperty({
    example: '데이터사이언스',
    description: '멘토링 희망분야',
    required: true,
  })
  public desiredField: string;
  @ApiProperty({
    example: '주니어(1~3년)',
    description: '경력',
    required: true,
  })
  public years: number;
  @ApiProperty({
    example:
      '"저는 프론트엔드 개발자로 5년간 일해왔으며, 이제 후배 개발자들에게 저의 경험을 나누고 싶습니다."',
    description: '간단한 자기소개',
    required: true,
  })
  public introduce: string;
  @ApiProperty({
    example: 'example@gmail.com',
    description: '포트폴리오 페이지',
    required: true,
  })
  public link: string;
}
