import { DataSource, Repository } from 'typeorm';
import { Message } from './entities/messages.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { MessageDto } from './dto/create-message.dto';
import { throwError } from 'src/utils/throwError';
@Injectable()
export class MessageRepository extends Repository<Message> {
  constructor(private dataSource: DataSource) {
    super(Message, dataSource.createEntityManager());
  }

  async createMessage(messageDto: MessageDto) {
    try {
      const newMessage = this.create(messageDto);
      await this.save(newMessage);
      return newMessage;
    } catch (error) {
      throwError(error);
    }
  }

  async createManyMessages(messageDto: MessageDto[]) {
    try {
      const newMessages = this.create(messageDto);
      await this.save(newMessages);
      return newMessages;
    } catch (error) {
      throwError(error);
    }
  }

  async updateMessage(id: number, messageDto: MessageDto) {
    try {
      const updatedData = await this.update({ id }, messageDto);
      if (updatedData.affected === 0) {
        throw new NotFoundException();
      }
      return updatedData;
    } catch (error) {
      throwError(error);
    }
  }

  async getMessageById(id: number) {
    try {
      const message = await this.findOne({
        where: { id },
        relations: ['options'],
      });
      if (!message) {
        throw new NotFoundException('Message not found');
      }
      return message;
    } catch (error) {
      throwError(error);
    }
  }

  async findAllMessages(limit?: number, offset?: number, page?: number) {
    try {
      let allMessages: Awaited<ReturnType<typeof this.find>>;
      if (page && !offset) {
        const offset = (page - 1) * limit || 10;
        allMessages = await this.find({
          take: limit,
          skip: offset,
          relations: ['options'],
        });
      }
      if (limit && offset) {
        allMessages = await this.find({
          take: limit,
          skip: offset,
          relations: ['options'],
        });
      }
      if (!limit && !offset && !page) {
        allMessages = await this.find({
          relations: ['options'],
        });
      }
      return allMessages;
    } catch (error) {
      throwError(error);
    }
  }

  async removeMessageById(id: number) {
    try {
      const deletedData = await this.delete({ id });
      if (deletedData.affected === 0) {
        throw new NotFoundException();
      }
      return deletedData;
    } catch (error) {
      throwError(error);
    }
  }
}
