import { MigrationInterface, QueryRunner } from 'typeorm';

export class Mentoring_field1738664455919 implements MigrationInterface {
  name = 'Mentoring_field1738664455919';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`mentorprofile\` DROP COLUMN \`career\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentoringprograms\` ADD \`mentoring_field\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`mentoringprograms\` DROP COLUMN \`mentoring_field\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentorprofile\` ADD \`career\` text NULL`,
    );
  }
}
