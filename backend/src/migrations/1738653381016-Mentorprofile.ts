import { MigrationInterface, QueryRunner } from 'typeorm';

export class Mentorprofile1738653381016 implements MigrationInterface {
  name = 'Mentorprofile1738653381016';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`availableschedule\` DROP FOREIGN KEY \`FK_6f0b2c93f27f15df9ed7f185bad\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_6f0b2c93f27f15df9ed7f185ba\` ON \`availableschedule\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_6f0b2c93f27f15df9ed7f185ba\` ON \`availableschedule\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentorprofile\` ADD \`career\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentorprofile\` ADD \`year\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`availableschedule\` ADD UNIQUE INDEX \`IDX_870431e0a2b4913a0bdcdeba1e\` (\`programId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_870431e0a2b4913a0bdcdeba1e\` ON \`availableschedule\` (\`programId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`availableschedule\` ADD CONSTRAINT \`FK_870431e0a2b4913a0bdcdeba1ef\` FOREIGN KEY (\`programId\`) REFERENCES \`mentoringprograms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`availableschedule\` DROP FOREIGN KEY \`FK_870431e0a2b4913a0bdcdeba1ef\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_870431e0a2b4913a0bdcdeba1e\` ON \`availableschedule\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`availableschedule\` DROP INDEX \`IDX_870431e0a2b4913a0bdcdeba1e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentorprofile\` DROP COLUMN \`year\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentorprofile\` DROP COLUMN \`career\``,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_6f0b2c93f27f15df9ed7f185ba\` ON \`availableschedule\` (\`programId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_6f0b2c93f27f15df9ed7f185ba\` ON \`availableschedule\` (\`programId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`availableschedule\` ADD CONSTRAINT \`FK_6f0b2c93f27f15df9ed7f185bad\` FOREIGN KEY (\`programId\`) REFERENCES \`mentoringprograms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
