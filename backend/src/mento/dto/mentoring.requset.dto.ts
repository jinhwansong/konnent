import { ApiProperty } from '@nestjs/swagger';

export class mentoringRequsetDto {
  @ApiProperty({
    example: '멘토링 제목을 적어주세요',
    description: '멘토링 제목',
    required: true,
  })
  public title: string;
  @ApiProperty({
    example: '멘토링 내용을 적어주세요',
    description: '멘토링 내용',
    required: true,
  })
  public content: string;
  @ApiProperty({
    example: '30000',
    description: '멘토링비용',
    required: true,
  })
  public price: number;
}
