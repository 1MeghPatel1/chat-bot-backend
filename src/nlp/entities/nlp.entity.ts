import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Nlp extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  utterance: string;

  @Column()
  intent: string;

  @Column()
  answer: string;
}
