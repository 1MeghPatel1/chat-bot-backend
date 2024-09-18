import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageDto } from './dto/create-message.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { createResponse } from 'src/utils/createResponse';
import { ConfigService } from '@nestjs/config';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly configService: ConfigService,
  ) {}

  @ApiOperation({
    summary: 'Get default message',
  })
  @Get('/')
  async getDefaultMessage() {
    const data = await this.messagesService.getMessageById(1);
    return createResponse(true, 200, 'Found successfully', {
      ...data,
      sender: 'bot',
    });
  }

  @ApiParam({
    name: 'id',
    description: 'Get message by id',
    example: 1,
    required: false,
  })
  @Get('/:id')
  async getMessages(@Param('id') id: number) {
    const data = await this.messagesService.getMessageById(id);

    return createResponse(true, 200, 'Found successfully', {
      ...data,
      sender: 'bot',
    });
  }

  @Post('create')
  async createMessage(@Body(ValidationPipe) messageDto: MessageDto) {
    const data = await this.messagesService.createMessage(messageDto);
    return createResponse(true, 200, 'Successfully created', data);
  }
}
