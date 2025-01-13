import { MigrationInterface, QueryRunner } from 'typeorm';

export class addMentorProfile1735576022227 implements MigrationInterface {
  name = 'Migrations1735576022227';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`mentoringprograms\` DROP FOREIGN KEY \`FK_92fd4d0a022589ac483f80f4e30\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_39f7f04e650f5de014306151d1f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentoringprograms\` CHANGE \`mentorsId\` \`profileId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` CHANGE \`mentorsId\` \`profileId\` int NULL`,
    );
    await queryRunner.query(
      `CREATE TABLE \`mentorprofile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`company\` varchar(255) NOT NULL, \`introduce\` text NOT NULL, \`image\` varchar(200) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`mentorId\` int NULL, UNIQUE INDEX \`REL_d8dcb13b5ed3f6517cefbf228a\` (\`mentorId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`mentors\` DROP COLUMN \`company\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('user', 'mentor', 'admin') NOT NULL DEFAULT 'user'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentoringprograms\` ADD CONSTRAINT \`FK_40f08a1d8285834b41b21f39f61\` FOREIGN KEY (\`profileId\`) REFERENCES \`mentorprofile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentorprofile\` ADD CONSTRAINT \`FK_d8dcb13b5ed3f6517cefbf228a5\` FOREIGN KEY (\`mentorId\`) REFERENCES \`mentors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE \`mentorprofile\` DROP FOREIGN KEY \`FK_d8dcb13b5ed3f6517cefbf228a5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentoringprograms\` DROP FOREIGN KEY \`FK_40f08a1d8285834b41b21f39f61\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('user', 'Mentor', 'admin') NOT NULL DEFAULT 'user'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentors\` ADD \`company\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_d8dcb13b5ed3f6517cefbf228a\` ON \`mentorprofile\``,
    );
    await queryRunner.query(`DROP TABLE \`mentorprofile\``);
    await queryRunner.query(
      `ALTER TABLE \`posts\` CHANGE \`profileId\` \`mentorsId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentoringprograms\` CHANGE \`profileId\` \`mentorsId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_39f7f04e650f5de014306151d1f\` FOREIGN KEY (\`mentorsId\`) REFERENCES \`mentors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentoringprograms\` ADD CONSTRAINT \`FK_92fd4d0a022589ac483f80f4e30\` FOREIGN KEY (\`mentorsId\`) REFERENCES \`mentors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
