import { MigrationInterface, QueryRunner } from 'typeorm';

export class Rating1737997433317 implements MigrationInterface {
  name = 'Rating1737997433317';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`mentoringprograms\` ADD \`averageRating\` decimal(2,1) NOT NULL DEFAULT '0.0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentoringprograms\` ADD \`totalRatings\` int NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentoringprograms\` DROP FOREIGN KEY \`FK_40f08a1d8285834b41b21f39f61\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentoringprograms\` CHANGE \`profileId\` \`profileId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentoringprograms\` ADD CONSTRAINT \`FK_40f08a1d8285834b41b21f39f61\` FOREIGN KEY (\`profileId\`) REFERENCES \`mentorprofile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`mentoringprograms\` DROP FOREIGN KEY \`FK_40f08a1d8285834b41b21f39f61\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentoringprograms\` CHANGE \`profileId\` \`profileId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentoringprograms\` ADD CONSTRAINT \`FK_40f08a1d8285834b41b21f39f61\` FOREIGN KEY (\`profileId\`) REFERENCES \`mentorprofile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentoringprograms\` DROP COLUMN \`totalRatings\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`mentoringprograms\` DROP COLUMN \`averageRating\``,
    );
  }
}
