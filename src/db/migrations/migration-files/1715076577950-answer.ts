import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Answer1715076577950 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'answers',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'answer',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'intentId',
            type: 'integer',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['intentId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'intents',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE answers`);
  }
}
