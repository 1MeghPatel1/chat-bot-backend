import { Injectable } from '@nestjs/common';
import { MessageRepository } from './messages.repository';
import { MessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async createMessage(messageDto: MessageDto) {
    return this.messageRepository.createMessage(messageDto);
  }

  async getMessageById(id: number) {
    return this.messageRepository.getMessageById(id);
  }
}
