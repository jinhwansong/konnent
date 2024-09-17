import { ApiProperty } from '@nestjs/swagger';

export class JoinRequestDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: '이메일',
    required: true,
  })
  public email: string;
  @ApiProperty({
    example: '123456Q!',
    description: '비밀번호',
    required: true,
  })
  public password: string;
  @ApiProperty({
    example: '지젤',
    description: '이름',
    required: true,
  })
  public name: string;
  @ApiProperty({
    example: '지젤',
    description: '닉네임',
    required: true,
  })
  public nickname: string;
  @ApiProperty({
    example: '01012345678',
    description: '휴대폰번호',
    required: true,
  })
  public phone: number;
}
