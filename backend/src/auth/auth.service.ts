import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '@/users/users.service';
import { JoinDto, LoginDto } from './dto/auth.dto';
import { RedisService } from '@/redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}
  async join(body: JoinDto) {
    const { email, name, nickname, phone, password } = body;
    // 이메일 중복체크
    const exUser = await this.usersService.findByEmail(email);
    if (exUser) {
      throw new UnauthorizedException('이미 사용중인 이메일 입니다.');
    }
    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.createUser({
      email,
      name,
      phone,
      password: hashedPassword,
      nickname,
    });
  }
  async login(body: LoginDto, res) {
    const { email, password } = body;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
    }
    // Access Token
    const accessToken = this.jwtService.sign(
      { id: user.id, email: user.email },
      { secret: process.env.COOKIE_SECRET, expiresIn: '15m' },
    );
    // refreshToken
    const refreshToken = this.jwtService.sign(
      { id: user.id, email: user.email },
      { secret: process.env.REFRESH_SECRET, expiresIn: '1d' },
    );
    // 레디스에 저장
    await this.redisService.saveRefreshToken(user.id, refreshToken);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, // 클라이언트에서 접근 불가 (보안)
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1일
    });
    return {
      message: '로그인 되었습니다.',
      accessToken,
      email,
      name: user.name,
      nickname: user.nickname,
      image: user.image,
      phone: user.phone,
      role: user.role,
    };
  }
  async refresh(refreshToken:string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh Token이 없습니다.');
    }
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_SECRET,
      });
      const savedToken = await this.redisService.getRefreshToken(payload.id);
      if (savedToken !== refreshToken) {
        throw new UnauthorizedException('Refresh Token이 유효하지 않습니다.');
      }
      // 새로운 토큰 생성
      const accessToken = this.jwtService.sign(
        { id: payload.id, email: payload.email },
        { secret: process.env.COOKIE_SECRET, expiresIn: '15m' },
      );
      return { message: '새로운 access Token이 발급되었습니다.', accessToken };
    } catch (error) {
      throw new UnauthorizedException('Refresh Token이 유효하지 않습니다.');
    }
  }
  async logout(req, res) {
    const user = req.user;
    if (!user || !user.id) {
      return res
        .status(400)
        .json({ message: '사용자 정보가 존재하지 않습니다.' });
    }
    await this.redisService.deleteRefreshToken(user.id);
    res.clearCookie('refreshToken');
    return res.status(200).json({ message: '로그아웃 되었습니다.' });
  }
}
