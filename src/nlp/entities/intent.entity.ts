import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Utterances } from './utterance.entity';
import { Answers } from './answer.entity';

@Entity()
export class Intent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  intent: string;

  @OneToMany(() => Utterances, (utterances) => utterances.intent)
  utterances: Utterances[];

  @OneToMany(() => Answers, (answers) => answers.intent)
  answers: Answers[];
}
