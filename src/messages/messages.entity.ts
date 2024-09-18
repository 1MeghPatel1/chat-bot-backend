import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Option } from '../options/options.entity';

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reply: string;

  @OneToMany(() => Option, (option) => option.message, { eager: false })
  options: number[];
}
