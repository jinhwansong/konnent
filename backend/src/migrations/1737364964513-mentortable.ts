import { MigrationInterface, QueryRunner } from 'typeorm';

export class Mentortable1737364964513 implements MigrationInterface {
  name = 'Mentortable1737364964513';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`mentors\` ADD \`email\` varchar(30) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentors\` ADD UNIQUE INDEX \`IDX_2968ad4001f7790e37fd82dfbc\` (\`email\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentors\` ADD \`job\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentors\` ADD \`career\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentors\` ADD \`portfolio\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentors\` ADD \`status\` enum ('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`mentors\` DROP COLUMN \`status\``);
    await queryRunner.query(
      `ALTER TABLE \`mentors\` DROP COLUMN \`portfolio\``,
    );
    await queryRunner.query(`ALTER TABLE \`mentors\` DROP COLUMN \`career\``);
    await queryRunner.query(`ALTER TABLE \`mentors\` DROP COLUMN \`job\``);
    await queryRunner.query(
      `ALTER TABLE \`mentors\` DROP INDEX \`IDX_2968ad4001f7790e37fd82dfbc\``,
    );
    await queryRunner.query(`ALTER TABLE \`mentors\` DROP COLUMN \`email\``);
  }
}
