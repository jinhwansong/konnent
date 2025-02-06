import { MigrationInterface, QueryRunner } from 'typeorm';

export class MentorPosition1738656816180 implements MigrationInterface {
  name = 'MentorPosition1738656816180';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`mentorprofile\` ADD \`position\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`mentorprofile\` DROP COLUMN \`position\``,
    );
  }
}
