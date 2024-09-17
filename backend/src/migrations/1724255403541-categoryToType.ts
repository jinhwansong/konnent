import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1724255403541 implements MigrationInterface {
  // 실제 수행할 카테고리
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `mentions` RENAME COLUMN `category` TO `type`',
    );
  }
  // 롤백할꺼
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `mentions` RENAME COLUMN `type` TO `category`',
    );
  }
}
