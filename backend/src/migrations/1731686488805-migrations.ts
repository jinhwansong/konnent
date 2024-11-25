import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1731686488805 implements MigrationInterface {
  name = 'Migrations1731686488805';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`Mentors\` DROP COLUMN \`currentJob\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Mentors\` DROP COLUMN \`desiredField\``,
    );
    await queryRunner.query(`ALTER TABLE \`Mentors\` DROP COLUMN \`link\``);
    await queryRunner.query(`ALTER TABLE \`Mentors\` DROP COLUMN \`office\``);
    await queryRunner.query(`ALTER TABLE \`Mentors\` DROP COLUMN \`statue\``);
    await queryRunner.query(`ALTER TABLE \`Mentors\` DROP COLUMN \`years\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`MentorringPrograms\` DROP FOREIGN KEY \`FK_f51ea92650ce7a2a2f549528b26\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Payments\` DROP FOREIGN KEY \`FK_e6df78aa0d9ac91094e373b3894\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Payments\` DROP FOREIGN KEY \`FK_f7844688b0174cb3c3faa9ef5b7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` varchar(11) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP INDEX \`IDX_20edee3355e3c12ade37e57258\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`snsid\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`snsId\` varchar(45) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Mentors\` ADD \`years\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Mentors\` ADD \`statue\` enum ('pendding', 'approved', 'rejected') NOT NULL DEFAULT 'pendding'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Mentors\` ADD \`office\` varchar(30) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Mentors\` ADD \`link\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Mentors\` ADD \`desiredField\` varchar(20) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Mentors\` ADD \`currentJob\` varchar(30) NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE \`MentorringPrograms\``);
    await queryRunner.query(`DROP TABLE \`Payments\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`snsId_UNIQUE\` ON \`users\` (\`snsId\`)`,
    );
  }
}
