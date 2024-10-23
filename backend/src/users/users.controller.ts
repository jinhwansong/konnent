import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDtoByPassword } from 'src/common/dto/user.dto';
import { JoinRequestDto } from './dto/join.requset.dto';
import { User } from 'src/common/decorators/user.decorator';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { NotLoggedInGuard } from 'src/auth/not-logged-in.guard';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.Interceptor';

@UseInterceptors(UndefinedToNullInterceptor)
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
  @UseGuards(new NotLoggedInGuard())
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
    return { message: '회원가입이 완료되었습니다.' };
  }
  @ApiResponse({
    status: 201,
    description: '사용 가능한 이메일 입니다.',
    schema: {
      properties: {
        message: { type: 'string', example: '사용 가능한 이메일 입니다.' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: '중복된 이메일이 존재합니다.',
    schema: {
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'string', example: '중복된 이메일이 존재합니다.' },
      },
    },
  })
  @ApiOperation({ summary: '이메일 중복검사' })
  @Post('checkEmail')
  async checkEmail(@Body('email') email: string) {
    return this.userService.checkEmail(email);
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
    return this.userService.checkNickname(nickname);
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
  @UseGuards(new LocalAuthGuard())
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
  @UseGuards(new LoggedInGuard())
  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  LogOut(@Req() req, @Res() res) {
    req.logout();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
