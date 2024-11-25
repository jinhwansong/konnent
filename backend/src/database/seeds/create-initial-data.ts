import { DataSource } from 'typeorm';
import bcrypt from 'bcrypt';
import { SocialLoginProvider, UserRole, Users } from '../../entities/Users';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    // 랜덤데이터 만들때 사용
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const password = await bcrypt.hash('admin123!#', 12);
    const admin = await dataSource.getRepository(Users);
    await admin.insert([
      {
        email: 'admin@naver.com',
        password: password,
        name: '관리자',
        nickname: '관리자',
        phone: '01012345678',
        role: UserRole.ADMIN,
        socialLoginProvider: SocialLoginProvider.LOCAL,
      },
    ]);
  }
}
