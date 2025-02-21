import { MigrationInterface, QueryRunner } from 'typeorm';

export class PaymentToReceipt1740036826653 implements MigrationInterface {
  name = 'PaymentToReceipt1740036826653';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`payments\` ADD \`receiptUrl\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`payments\` DROP COLUMN \`receiptUrl\``,
    );
  }
}
