import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddelware } from './middlewares/logger.middelware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MentorModule } from './mento/mentor.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Likes } from './entities/Likes';
import { Comments } from './entities/Comments';
import { MentoringPrograms } from './entities/MentoringPrograms';
import { Mentors } from './entities/Mentors';
import { Payments } from './entities/Payments';
import { Posts } from './entities/Posts';
import { Users } from './entities/Users';
import { UsersService } from './users/users.service';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    // dotenv 전역사용
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    MentorModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      // 직접 만들고 db에 만들때 처음에 만들때만 true로
      synchronize: false,
      // 연결유지
      keepConnectionAlive: true,
      logging: true,
      migrations: [__dirname + '/migrations/*.ts'],
      // 이모티콘을 사용하기 위해 쓰는거
      charset: 'utf8mb4_general_ci',
      autoLoadEntities: true,
      extra: {
        connectionLimit: 10, // 동시 연결 수 제한
        connectTimeout: 60000, // 연결 시도 제한 시간 (ms)
        acquireTimeout: 60000, // 연결 획득 제한 시간 (ms)
        timeout: 60000, // 쿼리 제한 시간 (ms)
        enableKeepAlive: true, // TCP Keep-Alive 활성화
        keepAliveInitialDelay: 30000, // Keep-Alive 초기 지연 시간 (ms)
      },
    }),
    TypeOrmModule.forFeature([
      Comments,
      Likes,
      MentoringPrograms,
      Mentors,
      Payments,
      Posts,
      Users,
    ]),
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddelware).forRoutes('*');
  }
}
