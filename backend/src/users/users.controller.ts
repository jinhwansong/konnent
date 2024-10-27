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
import { KakaoAuthGuard } from 'src/auth/kakao-auth.guard';
import { Response } from 'express';
import { NaverAuthGuard } from 'src/auth/naver-auth.guard';
import { GoogleAuthGuard } from 'src/auth/google-auth.guard';

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
    status: 200,
    description: '카카오 로그인 성공',
    type: UserDtoByPassword,
  })
  @ApiResponse({
    status: 500,
    description: '서버에러',
  })
  @ApiOperation({ summary: '카카오로그인' })
  @UseGuards(KakaoAuthGuard)
  @Get('auth/kakao')
  kakaoLogin() {
    return;
  }
  @UseGuards(KakaoAuthGuard)
  @Get('auth/kakao/callback')
  async kakaoCallback(@Res() res: Response) {
    return res.redirect(`${process.env.CLIENT}`);
  }
  @ApiResponse({
    status: 200,
    description: '구글 로그인 성공',
    type: UserDtoByPassword,
  })
  @ApiResponse({
    status: 500,
    description: '서버에러',
  })
  @ApiOperation({ summary: '구글 로그인' })
  @UseGuards(GoogleAuthGuard)
  @Get('auth/google')
  googleLogin() {
    return;
  }
  @UseGuards(GoogleAuthGuard)
  @Get('auth/google/callback')
  async googleCallback(@Res() res: Response) {
    return res.redirect(`${process.env.CLIENT}`);
  }
  @ApiResponse({
    status: 200,
    description: '네이버 로그인 성공',
    type: UserDtoByPassword,
  })
  @ApiResponse({
    status: 500,
    description: '서버에러',
  })
  @ApiOperation({ summary: '네이버 로그인' })
  @UseGuards(NaverAuthGuard)
  @Get('auth/naver')
  naverLogin() {
    return;
  }
  @UseGuards(NaverAuthGuard)
  @Get('auth/naver/callback')
  async naverCallback(@Res() res: Response) {
    return res.redirect(`${process.env.CLIENT}`);
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
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: '로그아웃 실패했습니다' });
      }
      req.session.destroy((err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: '세션키 삭제를 실패했습니다' });
        }
        res.clearCookie('connect.sid', {
          httpOnly: true,
          path: '/',
          secure: false,
        });
        return res.status(200).send('로그아웃 하셨습니다');
      });
    });
  }
}
