import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1727799500409 implements MigrationInterface {
  name = 'Migrations1727799500409';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`Payments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`price\` int NOT NULL, \`statue\` enum ('pendding', 'approved', 'rejected') NOT NULL DEFAULT 'pendding', \`transactionId\` varchar(100) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`usersId\` int NULL, \`mentoringProgramsId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`MentoringPrograms\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(100) NOT NULL, \`content\` text NOT NULL, \`price\` int NOT NULL, \`date\` json NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`mentosId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`deleteAt\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`snsid\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`deletedAt\` datetime(6) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Payments\` ADD CONSTRAINT \`FK_f7844688b0174cb3c3faa9ef5b7\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`Payments\` ADD CONSTRAINT \`FK_e6df78aa0d9ac91094e373b3894\` FOREIGN KEY (\`mentoringProgramsId\`) REFERENCES \`MentoringPrograms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`MentoringPrograms\` ADD CONSTRAINT \`FK_f51ea92650ce7a2a2f549528b26\` FOREIGN KEY (\`mentosId\`) REFERENCES \`mentos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`MentoringPrograms\` DROP FOREIGN KEY \`FK_f51ea92650ce7a2a2f549528b26\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Payments\` DROP FOREIGN KEY \`FK_e6df78aa0d9ac91094e373b3894\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`Payments\` DROP FOREIGN KEY \`FK_f7844688b0174cb3c3faa9ef5b7\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`deletedAt\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`snsid\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`deleteAt\` datetime(6) NULL`,
    );
    await queryRunner.query(`DROP TABLE \`MentoringPrograms\``);
    await queryRunner.query(`DROP TABLE \`Payments\``);
  }
}
