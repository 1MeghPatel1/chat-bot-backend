import { Injectable } from '@nestjs/common';
import { MessageRepository } from 'src/messages/messages.repository';

@Injectable()
export class SeedService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async seedMessages(): Promise<void> {
    const messages = [
      {
        id: 1,
        reply: 'Welcome to our hospital! How can I assist you today?',
      },
    ];

    for (const message of messages) {
      const newMessage = this.messageRepository.create(message);
      await this.messageRepository.save(newMessage);
    }
  }
}
