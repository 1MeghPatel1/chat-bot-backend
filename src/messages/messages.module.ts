import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/messages.entity';
import { MessageRepository } from './messages.repository';
import { OptionRepository } from 'src/options/options.repository';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [MessagesController],
  providers: [
    MessagesService,
    MessageRepository,
    OptionRepository,
    ConfigService,
  ],
  exports: [MessageRepository],
})
export class MessagesModule {}
