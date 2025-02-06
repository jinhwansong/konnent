import { MigrationInterface, QueryRunner } from 'typeorm';

export class Schedule1738416459537 implements MigrationInterface {
  name = 'Schedule1738416459537';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`exceptionsschedule\` DROP FOREIGN KEY \`FK_cb14db0627c3306665f2074f08a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`exceptionsschedule\` DROP COLUMN \`programsId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`exceptionsschedule\` DROP COLUMN \`type\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`availableschedule\` ADD \`break_time\` int NOT NULL DEFAULT '10'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` ADD \`scheduleId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`exceptionsschedule\` ADD \`reason\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`exceptionsschedule\` ADD \`profileId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`availableschedule\` DROP FOREIGN KEY \`FK_6f0b2c93f27f15df9ed7f185bad\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`availableschedule\` CHANGE \`programsId\` \`programsId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`availableschedule\` ADD UNIQUE INDEX \`IDX_6f0b2c93f27f15df9ed7f185ba\` (\`programsId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_6f0b2c93f27f15df9ed7f185ba\` ON \`availableschedule\` (\`programsId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`availableschedule\` ADD CONSTRAINT \`FK_6f0b2c93f27f15df9ed7f185bad\` FOREIGN KEY (\`programsId\`) REFERENCES \`mentoringprograms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` ADD CONSTRAINT \`FK_5aa94ce2c331b3e3f1965a8291e\` FOREIGN KEY (\`scheduleId\`) REFERENCES \`availableschedule\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`exceptionsschedule\` ADD CONSTRAINT \`FK_12525accb71f7d16f416421c537\` FOREIGN KEY (\`profileId\`) REFERENCES \`mentorprofile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`exceptionsschedule\` DROP FOREIGN KEY \`FK_12525accb71f7d16f416421c537\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` DROP FOREIGN KEY \`FK_5aa94ce2c331b3e3f1965a8291e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`availableschedule\` DROP FOREIGN KEY \`FK_6f0b2c93f27f15df9ed7f185bad\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_6f0b2c93f27f15df9ed7f185ba\` ON \`availableschedule\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`availableschedule\` DROP INDEX \`IDX_6f0b2c93f27f15df9ed7f185ba\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`availableschedule\` CHANGE \`programsId\` \`programsId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`availableschedule\` ADD CONSTRAINT \`FK_6f0b2c93f27f15df9ed7f185bad\` FOREIGN KEY (\`programsId\`) REFERENCES \`mentoringprograms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`exceptionsschedule\` DROP COLUMN \`profileId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`exceptionsschedule\` DROP COLUMN \`reason\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` DROP COLUMN \`scheduleId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`availableschedule\` DROP COLUMN \`break_time\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`exceptionsschedule\` ADD \`type\` enum ('holiday', 'special', 'unavailable') NOT NULL DEFAULT 'unavailable'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`exceptionsschedule\` ADD \`programsId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`exceptionsschedule\` ADD CONSTRAINT \`FK_cb14db0627c3306665f2074f08a\` FOREIGN KEY (\`programsId\`) REFERENCES \`mentoringprograms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
