import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Comments } from './src/entities/Comments';
import { Likes } from './src/entities/Likes';
import { MentoringPrograms } from './src/entities/MentoringPrograms';
import { Mentors } from './src/entities/Mentors';
import { Payments } from './src/entities/Payments';
import { Posts } from './src/entities/Posts';
import { Users } from './src/entities/Users';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    Comments,
    Likes,
    MentoringPrograms,
    Mentors,
    Payments,
    Posts,
    Users,
  ],
  migrations: [__dirname + '/src/migrations/*.ts'],
  charset: 'utf8mb4_general_ci',
  synchronize: false,
  logging: true,
  extra: {
    connectionLimit: 10, // 동시 연결 수 제한
    connectTimeout: 60000, // 연결 시도 제한 시간 (ms)
    acquireTimeout: 60000, // 연결 획득 제한 시간 (ms)
    timeout: 60000, // 쿼리 제한 시간 (ms)
    enableKeepAlive: true, // TCP Keep-Alive 활성화
    keepAliveInitialDelay: 30000, // Keep-Alive 초기 지연 시간 (ms)
    retryAttempts: 3,
    retryDelay: 3000,
    keepConnectionAlive: true,
  },
});

export default dataSource;
