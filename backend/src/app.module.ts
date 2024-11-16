import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddelware } from './middlewares/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MentoModule } from './mento/mento.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Likes } from './entities/Likes';
import { Comments } from './entities/Comments';
import { MentoringPrograms } from './entities/MentoringPrograms';
import { Mentos } from './entities/Mentos';
import { Payments } from './entities/Payments';
import { Posts } from './entities/Posts';
import { Users } from './entities/Users';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    // dotenv 전역사용
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    MentoModule,
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
      logging: true,
      migrations: [__dirname + '/migrations/*.ts'],
      keepConnectionAlive: true,
      connectTimeout: 60000,
      // 이모티콘을 사용하기 위해 쓰는거
      charset: 'utf8mb4_general_ci',
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([
      Comments,
      Likes,
      MentoringPrograms,
      Mentos,
      Payments,
      Posts,
      Users,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddelware).forRoutes('*');
  }
}
