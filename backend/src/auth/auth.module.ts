import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwtStrategy';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ session: false, defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.COOKIE_SECRET,
      signOptions: { expiresIn: '15m' }, // 만료시간 15분
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
