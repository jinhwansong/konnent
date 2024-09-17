import { ApiProperty, OmitType } from '@nestjs/swagger';
import { JoinRequestDto } from 'src/users/dto/join.requset.dto';

export class UserDto extends JoinRequestDto {
  @ApiProperty({
    required: true,
    example: 1,
    description: 'userId',
  })
  public id: number;
  @ApiProperty({
    required: true,
    example:
      'https://fastly.picsum.photos/id/1062/200/300.jpg?hmac=e6D9R3lyQ0AtilxM2LGviSrodxvroxcpCRm2FdfNwZg',
    description: '유저프로필',
  })
  public image: string;
}

//OmitType 기존 데이터에서 원하는거 뺄때.
export class UserDtoByPassword extends OmitType(UserDto, ['password']) {}
