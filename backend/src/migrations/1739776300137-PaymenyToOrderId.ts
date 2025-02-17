import { MigrationInterface, QueryRunner } from 'typeorm';

export class PaymenyToOrderId1739776300137 implements MigrationInterface {
  name = 'PaymenyToOrderId1739776300137';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`payments\` DROP COLUMN \`orderId\``);
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD \`orderId\` varchar(64) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` CHANGE \`reservationId\` \`reservationId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD UNIQUE INDEX \`IDX_1221b304716c539fde3fb3cb8d\` (\`reservationId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`contact\` CHANGE \`email\` \`email\` varchar(30) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_1221b304716c539fde3fb3cb8d\` ON \`payments\` (\`reservationId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_1221b304716c539fde3fb3cb8db\` FOREIGN KEY (\`reservationId\`) REFERENCES \`reservations\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_1221b304716c539fde3fb3cb8db\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_1221b304716c539fde3fb3cb8d\` ON \`payments\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`contact\` CHANGE \`email\` \`email\` varchar(30) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` DROP INDEX \`IDX_1221b304716c539fde3fb3cb8d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`payments\` CHANGE \`reservationId\` \`reservationId\` int NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`payments\` DROP COLUMN \`orderId\``);
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD \`orderId\` int NOT NULL`,
    );
  }
}
