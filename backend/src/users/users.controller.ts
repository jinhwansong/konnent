import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDtoByPassword } from 'src/common/dto/user.dto';
import { JoinRequestDto } from './dto/join.requset.dto';
import { User } from 'src/common/decorators/user.decorator';

@ApiTags('유저정보')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiResponse({
    status: 200,
    description: '사용자 정보 입니다',
    type: UserDtoByPassword,
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '내정보 조회' })
  @Get()
  getUser(@User() user) {
    return user;
  }
  @ApiResponse({
    status: 200,
    description: '회원가입이 완료되셨습니다.',
    type: JoinRequestDto,
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async Join(@Body() body: JoinRequestDto) {
    await this.userService.Join(
      body.email,
      body.password,
      body.name,
      body.nickname,
      body.phone,
    );
    return undefined;
  }
  @ApiResponse({
    status: 201,
    description: '사용가능한 이메일입니다.',
  })
  @ApiResponse({
    status: 403,
    description: '이미 사용 중인 이메일입니다.',
  })
  @ApiOperation({ summary: '이메일 중복검사' })
  @Post('checkEmail')
  checkEmail(@Body('email') email: string) {
    return email;
  }
  @ApiResponse({
    status: 201,
    description: '사용가능한 닉네임입니다.',
  })
  @ApiResponse({
    status: 403,
    description: '이미 사용 중인 닉네임입니다.',
  })
  @ApiOperation({ summary: '닉네임 중복검사' })
  @Post('checkNickname')
  checkNickname(@Body('nickname') nickname: string) {
    return nickname;
  }
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    type: UserDtoByPassword,
  })
  @ApiResponse({
    status: 500,
    description: '서버에러',
  })
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@User() user) {
    return user;
  }
  @ApiResponse({
    status: 201,
    description: '로그아웃 하셨습니다.',
  })
  @ApiResponse({
    status: 500,
    description: '서버에러',
  })
  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  LogOut(@Req() req, @Res() res) {
    req.logout();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
