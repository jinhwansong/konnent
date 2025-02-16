import { MigrationInterface, QueryRunner } from 'typeorm';

export class Payment1739723682518 implements MigrationInterface {
  name = 'Payment1739723682518';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`payments\` DROP COLUMN \`paymentType\``,
    );
    await queryRunner.query(`ALTER TABLE \`payments\` DROP COLUMN \`price\``);
    await queryRunner.query(`ALTER TABLE \`payments\` DROP COLUMN \`refuded\``);
    await queryRunner.query(
      `ALTER TABLE \`payments\` DROP COLUMN \`transactionId\``,
    );
    await queryRunner.query(`ALTER TABLE \`payments\` DROP COLUMN \`usersId\``);
    await queryRunner.query(
      `ALTER TABLE \`reservations\` DROP COLUMN \`availableSchedule\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD \`orderId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD UNIQUE INDEX \`IDX_af929a5f2a400fdb6913b4967e\` (\`orderId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD \`amount\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD \`orderName\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD \`paymentKey\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD \`paidAt\` datetime NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`payments\` ADD \`userId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`payments\` CHANGE \`status\` \`status\` enum ('pending', 'completed', 'failed', 'cancelled', 'refunded') NOT NULL DEFAULT 'pending'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contact\` DROP FOREIGN KEY \`FK_f83dbf69e8f2ac6e0b1b3cb590e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contact\` CHANGE \`reservationId\` \`reservationId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` DROP FOREIGN KEY \`FK_27f9509290480492a21286f08ed\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` DROP FOREIGN KEY \`FK_aa0e1cc2c4f54da32bf8282154c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` CHANGE \`programsId\` \`programsId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` CHANGE \`userId\` \`userId\` int NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_af929a5f2a400fdb6913b4967e\` ON \`payments\` (\`orderId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_d35cb3c13a18e1ea1705b2817b1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_af929a5f2a400fdb6913b4967e1\` FOREIGN KEY (\`orderId\`) REFERENCES \`reservations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contact\` ADD CONSTRAINT \`FK_f83dbf69e8f2ac6e0b1b3cb590e\` FOREIGN KEY (\`reservationId\`) REFERENCES \`reservations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` ADD CONSTRAINT \`FK_27f9509290480492a21286f08ed\` FOREIGN KEY (\`programsId\`) REFERENCES \`mentoringprograms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` ADD CONSTRAINT \`FK_aa0e1cc2c4f54da32bf8282154c\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`reservations\` DROP FOREIGN KEY \`FK_aa0e1cc2c4f54da32bf8282154c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` DROP FOREIGN KEY \`FK_27f9509290480492a21286f08ed\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contact\` DROP FOREIGN KEY \`FK_f83dbf69e8f2ac6e0b1b3cb590e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_af929a5f2a400fdb6913b4967e1\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_d35cb3c13a18e1ea1705b2817b1\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_af929a5f2a400fdb6913b4967e\` ON \`payments\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` CHANGE \`userId\` \`userId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` CHANGE \`programsId\` \`programsId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` ADD CONSTRAINT \`FK_aa0e1cc2c4f54da32bf8282154c\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reservations\` ADD CONSTRAINT \`FK_27f9509290480492a21286f08ed\` FOREIGN KEY (\`programsId\`) REFERENCES \`mentoringprograms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contact\` CHANGE \`reservationId\` \`reservationId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contact\` ADD CONSTRAINT \`FK_f83dbf69e8f2ac6e0b1b3cb590e\` FOREIGN KEY (\`reservationId\`) REFERENCES \`reservations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` CHANGE \`status\` \`status\` enum ('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending'`,
    );
    await queryRunner.query(`ALTER TABLE \`payments\` DROP COLUMN \`userId\``);
    await queryRunner.query(`ALTER TABLE \`payments\` DROP COLUMN \`paidAt\``);
    await queryRunner.query(
      `ALTER TABLE \`payments\` DROP COLUMN \`paymentKey\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` DROP COLUMN \`orderName\``,
    );
    await queryRunner.query(`ALTER TABLE \`payments\` DROP COLUMN \`amount\``);
    await queryRunner.query(
      `ALTER TABLE \`payments\` DROP INDEX \`IDX_af929a5f2a400fdb6913b4967e\``,
    );
    await queryRunner.query(`ALTER TABLE \`payments\` DROP COLUMN \`orderId\``);
    await queryRunner.query(
      `ALTER TABLE \`reservations\` ADD \`availableSchedule\` json NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD \`usersId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD \`transactionId\` varchar(100) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD \`refuded\` tinyint NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD \`price\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD \`paymentType\` varchar(20) NOT NULL`,
    );
  }
}
