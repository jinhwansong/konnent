import { MigrationInterface, QueryRunner } from 'typeorm';

export class MentorToType1734360174495 implements MigrationInterface {
  name = 'MentorToType1734360174495';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_32430293b6e29c32395eadaa5c\` ON \`mentors\``,
    );
    await queryRunner.query(`ALTER TABLE \`payments\` DROP COLUMN \`statue\``);
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD \`status\` enum ('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD \`paymentType\` varchar(20) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD \`refuded\` tinyint NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentors\` ADD \`company\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`mentors\` DROP COLUMN \`company\``);
    await queryRunner.query(`ALTER TABLE \`payments\` DROP COLUMN \`refuded\``);
    await queryRunner.query(
      `ALTER TABLE \`payments\` DROP COLUMN \`paymentType\``,
    );
    await queryRunner.query(`ALTER TABLE \`payments\` DROP COLUMN \`status\``);
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD \`statue\` enum ('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending'`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_32430293b6e29c32395eadaa5c\` ON \`mentors\` (\`userId\`)`,
    );
  }
}
