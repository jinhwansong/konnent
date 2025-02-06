import { MigrationInterface, QueryRunner } from 'typeorm';

export class Delyear1738653491911 implements MigrationInterface {
  name = 'Delyear1738653491911';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_870431e0a2b4913a0bdcdeba1e\` ON \`availableschedule\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentorprofile\` DROP COLUMN \`year\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`mentorprofile\` ADD \`year\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_870431e0a2b4913a0bdcdeba1e\` ON \`availableschedule\` (\`programId\`)`,
    );
  }
}
