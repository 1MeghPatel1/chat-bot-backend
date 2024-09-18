import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from '../messages/messages.entity';

@Entity()
export class Option extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  option: string;

  @Column()
  nextMessageId: number;

  @ManyToOne(() => Message, (message) => message.options, { eager: false })
  message: Message;
}
