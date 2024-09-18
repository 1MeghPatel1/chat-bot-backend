import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Intent } from './intent.entity';

@Entity()
export class Utterances extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  utterance: string;

  @ManyToOne(() => Intent, (intent) => intent.utterances, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  intent: Intent;
}
