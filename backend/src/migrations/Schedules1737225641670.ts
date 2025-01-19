import { MigrationInterface, QueryRunner } from 'typeorm';

export class Schedules1737225641670 implements MigrationInterface {
  name = 'Schedules1737225641670';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`reservations\` DROP FOREIGN KEY \`FK_27f9509290480492a21286f08ed\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_62d7b65c760c8957c32a110c717\``,
    );
    await queryRunner.query(
      `CREATE TABLE \`exceptionsschedule\` (\`id\` int NOT NULL AUTO_INCREMENT, \`exceptionDate\` date NOT NULL, \`type\` enum ('holiday', 'special', 'unavailable') NOT NULL DEFAULT 'unavailable', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`mentorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`availableschedule\` (\`id\` int NOT NULL AUTO_INCREMENT, \`available_schedule\` json NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`mentorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentoringprograms\` DROP COLUMN \`date\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentoringprograms\` ADD \`duration\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentoringprograms\` ADD \`status\` enum ('active', 'inactivity') NOT NULL DEFAULT 'active'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` ADD CONSTRAINT \`FK_27f9509290480492a21286f08ed\` FOREIGN KEY (\`programsId\`) REFERENCES \`mentoringprograms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`exceptionsschedule\` ADD CONSTRAINT \`FK_0bfbd78d0e8d2d307b1be30b814\` FOREIGN KEY (\`mentorId\`) REFERENCES \`mentors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`availableschedule\` ADD CONSTRAINT \`FK_2490a232c08eb9cb09d51b54ab3\` FOREIGN KEY (\`mentorId\`) REFERENCES \`mentors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_62d7b65c760c8957c32a110c717\` FOREIGN KEY (\`profileId\`) REFERENCES \`mentorprofile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_62d7b65c760c8957c32a110c717\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`availableschedule\` DROP FOREIGN KEY \`FK_2490a232c08eb9cb09d51b54ab3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`exceptionsschedule\` DROP FOREIGN KEY \`FK_0bfbd78d0e8d2d307b1be30b814\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` DROP FOREIGN KEY \`FK_27f9509290480492a21286f08ed\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentoringprograms\` DROP COLUMN \`status\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentoringprograms\` DROP COLUMN \`duration\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentoringprograms\` ADD \`date\` json NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE \`availableschedule\``);
    await queryRunner.query(`DROP TABLE \`exceptionsschedule\``);
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_62d7b65c760c8957c32a110c717\` FOREIGN KEY (\`profileId\`) REFERENCES \`mentor_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` ADD CONSTRAINT \`FK_27f9509290480492a21286f08ed\` FOREIGN KEY (\`programsId\`) REFERENCES \`mentoring_programs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
