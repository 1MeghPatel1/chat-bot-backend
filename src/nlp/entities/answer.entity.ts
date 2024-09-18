import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Intent } from './intent.entity';

@Entity()
export class Answers extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer: string;

  @ManyToOne(() => Intent, (intent) => intent.answers, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  intent: Intent;
}
