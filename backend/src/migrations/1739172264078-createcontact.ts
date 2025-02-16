import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContact1739172264078 implements MigrationInterface {
  name = 'CreateContact1739172264078';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`contact\` (\`id\` int NOT NULL AUTO_INCREMENT, \`phone\` varchar(11) NOT NULL, \`email\` varchar(30) NULL, \`message\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`reservationId\` int NULL, UNIQUE INDEX \`IDX_f9f62556c7092913f2a0697505\` (\`phone\`), UNIQUE INDEX \`IDX_eff09bb429f175523787f46003\` (\`email\`), UNIQUE INDEX \`REL_f83dbf69e8f2ac6e0b1b3cb590\` (\`reservationId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contact\` ADD CONSTRAINT \`FK_f83dbf69e8f2ac6e0b1b3cb590e\` FOREIGN KEY (\`reservationId\`) REFERENCES \`reservations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`contact\` DROP FOREIGN KEY \`FK_f83dbf69e8f2ac6e0b1b3cb590e\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_f83dbf69e8f2ac6e0b1b3cb590\` ON \`contact\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_eff09bb429f175523787f46003\` ON \`contact\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f9f62556c7092913f2a0697505\` ON \`contact\``,
    );
    await queryRunner.query(`DROP TABLE \`contact\``);
  }
}
