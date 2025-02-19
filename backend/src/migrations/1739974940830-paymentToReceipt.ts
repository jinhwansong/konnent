import { MigrationInterface, QueryRunner } from 'typeorm';

export class PaymentToReceipt1739974940830 implements MigrationInterface {
  name = 'PaymentToReceipt1739974940830';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_1221b304716c539fde3fb3cb8d\` ON \`payments\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_1221b304716c539fde3fb3cb8db\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_d35cb3c13a18e1ea1705b2817b1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` CHANGE \`status\` \`status\` enum ('pending', 'completed', 'refunded') NOT NULL DEFAULT 'pending'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` CHANGE \`reservationId\` \`reservationId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` CHANGE \`userId\` \`userId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` DROP FOREIGN KEY \`FK_5aa94ce2c331b3e3f1965a8291e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` CHANGE \`scheduleId\` \`scheduleId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_d35cb3c13a18e1ea1705b2817b1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_1221b304716c539fde3fb3cb8db\` FOREIGN KEY (\`reservationId\`) REFERENCES \`reservations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` ADD CONSTRAINT \`FK_5aa94ce2c331b3e3f1965a8291e\` FOREIGN KEY (\`scheduleId\`) REFERENCES \`availableschedule\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`reservations\` DROP FOREIGN KEY \`FK_5aa94ce2c331b3e3f1965a8291e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_1221b304716c539fde3fb3cb8db\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_d35cb3c13a18e1ea1705b2817b1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` CHANGE \`scheduleId\` \`scheduleId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` ADD CONSTRAINT \`FK_5aa94ce2c331b3e3f1965a8291e\` FOREIGN KEY (\`scheduleId\`) REFERENCES \`availableschedule\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` CHANGE \`userId\` \`userId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` CHANGE \`reservationId\` \`reservationId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` CHANGE \`status\` \`status\` enum ('pending', 'completed', 'failed', 'cancelled', 'refunded') NOT NULL DEFAULT 'pending'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_d35cb3c13a18e1ea1705b2817b1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_1221b304716c539fde3fb3cb8db\` FOREIGN KEY (\`reservationId\`) REFERENCES \`reservations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_1221b304716c539fde3fb3cb8d\` ON \`payments\` (\`reservationId\`)`,
    );
  }
}
