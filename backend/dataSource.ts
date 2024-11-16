import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Comments } from './src/entities/Comments';
import { Likes } from './src/entities/Likes';
import { MentoringPrograms } from './src/entities/MentoringPrograms';
import { Mentos } from './src/entities/Mentos';
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
    Mentos,
    Payments,
    Posts,
    Users,
  ],
  migrations: [__dirname + '/src/migrations/*.ts'],
  charset: 'utf8mb4_general_ci',
  synchronize: false,
  logging: true,
});

export default dataSource;
