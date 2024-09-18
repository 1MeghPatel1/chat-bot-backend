import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Options1713166512529 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'option',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'option',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'nextMessageId',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'messageId',
            type: 'integer',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['messageId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'message',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE option`);
  }
}
