import { DataSource, Repository } from 'typeorm';
import { Option } from './entities/options.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { MessageRepository } from 'src/messages/messages.repository';
import { throwError } from 'src/utils/throwError';
import { promisifyForEach } from 'src/utils/promisfiedForLoop';

@Injectable()
export class OptionRepository extends Repository<Option> {
  constructor(
    private dataSource: DataSource,
    private readonly messageRepository: MessageRepository,
  ) {
    super(Option, dataSource.createEntityManager());
  }

  async createOption(createOptionDto: CreateOptionDto) {
    try {
      const { option, nextMessageId, message } = createOptionDto;
      const nextMessage =
        await this.messageRepository.getMessageById(nextMessageId);
      if (!nextMessage) {
        throw new NotFoundException('Next message not found');
      }

      const storedMessage =
        await this.messageRepository.getMessageById(message);

      if (!storedMessage) {
        throw new NotFoundException('Message not found');
      }

      const newOption = this.create({
        option,
        nextMessageId,
        message: storedMessage,
      });
      await newOption.save();
      return newOption;
    } catch (error) {
      throwError(error);
    }
  }

  async createManyOptions(createOptionDto: CreateOptionDto[]) {
    const responseData: Option[] = [];
    try {
      await promisifyForEach(createOptionDto, async (item) => {
        const newOption = await this.createOption(item);
        responseData.push(newOption);
      });
      return responseData;
    } catch (error) {
      throwError(error);
    }
  }
}
