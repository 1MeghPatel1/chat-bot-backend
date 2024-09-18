import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Utterance1715076561622 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'utterances',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'utterance',
            type: 'text',
            isUnique: true,
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
    await queryRunner.query(`DROP TABLE utterances`);
  }
}
