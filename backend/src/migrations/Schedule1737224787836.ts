import { MigrationInterface, QueryRunner } from 'typeorm';

export class Schedule1737224787836 implements MigrationInterface {
  name = 'Schedule1737224787836';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 외래키 제약조건 먼저 확인 후 있으면 삭제
    const table = await queryRunner.getTable('payments');
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('mentoringProgramsId') !== -1,
    );

    if (foreignKey) {
      await queryRunner.dropForeignKey('payments', foreignKey);
    }
    // await queryRunner.query(
    //   `DROP INDEX \`FK_f75d65c7f193075c9e569b87493\` ON \`payments\``,
    // );
    // await queryRunner.query(
    //   `DROP INDEX \`FK_62d7b65c760c8957c32a110c717\` ON \`posts\``,
    // );
    await queryRunner.query(
      `CREATE TABLE \`mentoring_programs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(100) NOT NULL, \`content\` text NOT NULL, \`price\` int NOT NULL, \`duration\` int NOT NULL, \`status\` enum ('active', 'inactivity') NOT NULL DEFAULT 'active', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`profileId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`exceptions_schedule\` (\`id\` int NOT NULL AUTO_INCREMENT, \`exceptionDate\` date NOT NULL, \`type\` enum ('holiday', 'special', 'unavailable') NOT NULL DEFAULT 'unavailable', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`mentorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`available_schedule\` (\`id\` int NOT NULL AUTO_INCREMENT, \`available_schedule\` json NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`mentorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`mentor_profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`company\` varchar(255) NOT NULL, \`introduce\` text NOT NULL, \`image\` varchar(200) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`mentorId\` int NULL, UNIQUE INDEX \`REL_a355a09edf5805a54410696f9d\` (\`mentorId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    // 그 다음 컬럼 삭제
    await queryRunner.query(
      `ALTER TABLE \`payments\` DROP COLUMN \`mentoringProgramsId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentors\` CHANGE \`email\` \`email\` varchar(30) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentors\` ADD UNIQUE INDEX \`IDX_2968ad4001f7790e37fd82dfbc\` (\`email\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` (\`phone\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` ADD CONSTRAINT \`FK_f8dbec76216ec5e4ef78cdecbcf\` FOREIGN KEY (\`paymentId\`) REFERENCES \`payments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` ADD CONSTRAINT \`FK_27f9509290480492a21286f08ed\` FOREIGN KEY (\`programsId\`) REFERENCES \`mentoring_programs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` ADD CONSTRAINT \`FK_aa0e1cc2c4f54da32bf8282154c\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentoring_programs\` ADD CONSTRAINT \`FK_c6fecca0054034d9052bb120774\` FOREIGN KEY (\`profileId\`) REFERENCES \`mentor_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`exceptions_schedule\` ADD CONSTRAINT \`FK_9c49e50ddfc0abdd2bcfa5e11c7\` FOREIGN KEY (\`mentorId\`) REFERENCES \`mentors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`available_schedule\` ADD CONSTRAINT \`FK_d18639210d072b7b7314f61e5dc\` FOREIGN KEY (\`mentorId\`) REFERENCES \`mentors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentor_profile\` ADD CONSTRAINT \`FK_a355a09edf5805a54410696f9d7\` FOREIGN KEY (\`mentorId\`) REFERENCES \`mentors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_62d7b65c760c8957c32a110c717\` FOREIGN KEY (\`profileId\`) REFERENCES \`mentor_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_62d7b65c760c8957c32a110c717\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentor_profile\` DROP FOREIGN KEY \`FK_a355a09edf5805a54410696f9d7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`available_schedule\` DROP FOREIGN KEY \`FK_d18639210d072b7b7314f61e5dc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`exceptions_schedule\` DROP FOREIGN KEY \`FK_9c49e50ddfc0abdd2bcfa5e11c7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentoring_programs\` DROP FOREIGN KEY \`FK_c6fecca0054034d9052bb120774\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` DROP FOREIGN KEY \`FK_aa0e1cc2c4f54da32bf8282154c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` DROP FOREIGN KEY \`FK_27f9509290480492a21286f08ed\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` DROP FOREIGN KEY \`FK_f8dbec76216ec5e4ef78cdecbcf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP INDEX \`IDX_a000cca60bcf04454e72769949\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentors\` DROP INDEX \`IDX_2968ad4001f7790e37fd82dfbc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentors\` CHANGE \`email\` \`email\` varchar(30) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` DROP COLUMN \`updatedAt\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` DROP COLUMN \`createdAt\``,
    );
    // await queryRunner.query(
    //   `ALTER TABLE \`payments\` ADD \`mentoringProgramsId\` int NULL`,
    // );
    await queryRunner.query(
      `DROP INDEX \`REL_a355a09edf5805a54410696f9d\` ON \`mentor_profile\``,
    );
    await queryRunner.query(`DROP TABLE \`mentor_profile\``);
    await queryRunner.query(`DROP TABLE \`available_schedule\``);
    await queryRunner.query(`DROP TABLE \`exceptions_schedule\``);
    await queryRunner.query(`DROP TABLE \`mentoring_programs\``);
    await queryRunner.query(
      `CREATE INDEX \`FK_62d7b65c760c8957c32a110c717\` ON \`posts\` (\`profileId\`)`,
    );
    // await queryRunner.query(
    //   `CREATE INDEX \`FK_f75d65c7f193075c9e569b87493\` ON \`payments\` (\`mentoringProgramsId\`)`,
    // );
  }
}
