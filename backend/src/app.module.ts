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
import { DataSource } from 'typeorm';
import { join } from 'path';
import { MentorProfile } from './entities/MentorProfile';
import { Reservations } from './entities/Reservations';
import { ExceptionsSchedule } from './entities/ExceptionsSchedule';
import { AvailableSchedule } from './entities/AvailableSchedule';
import { ProgramModule } from './program/program.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    // dotenv 전역사용
    ConfigModule.forRoot({
      isGlobal: true,
    }),

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
      logging: ['error', 'warn', 'info'],
      poolSize: 20,
      migrations: [join(__dirname, './migrations/**/*{.ts,.js}')],
      migrationsRun: true,
      migrationsTableName: 'migrations',
      // 이모티콘을 사용하기 위해 쓰는거
      charset: 'utf8mb4_general_ci',
      autoLoadEntities: true,
      extra: {
        connectionLimit: 10, // 동시 연결 수 제한
        connectTimeout: 60000, // 연결 시도 제한 시간 (ms)
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
      MentorProfile,
      Reservations,
      ExceptionsSchedule,
      AvailableSchedule,
    ]),
    AdminModule,
    ProgramModule,
    ScheduleModule,
    ReservationModule,
    UsersModule,
    MentorModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  async onModuleInit() {
    try {
      if (!this.dataSource.isInitialized) {
        await this.dataSource.initialize();
      }

      // 연결 상태 모니터링
      setInterval(async () => {
        try {
          if (!this.dataSource.isInitialized) {
            await this.dataSource.initialize();
            console.log('Database reconnected successfully');
          }

          // 연결 테스트를 위한 간단한 쿼리 실행
          await this.dataSource.query('SELECT 1');
        } catch (error) {
          console.error('Database connection error:', error);
          // 연결이 끊어진 경우 재연결 시도
          if (this.dataSource.isInitialized) {
            await this.dataSource.destroy();
          }
          await this.dataSource.initialize();
        }
      }, 5000); // 5초마다 체크
    } catch (error) {
      console.error('Failed to initialize database connection:', error);
    }
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddelware).forRoutes('*');
  }
}
