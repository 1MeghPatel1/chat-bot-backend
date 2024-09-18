import { Module } from '@nestjs/common';
import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Option } from './entities/options.entity';
import { OptionRepository } from './options.repository';
import { MessageRepository } from 'src/messages/messages.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Option])],
  controllers: [OptionsController],
  providers: [OptionsService, OptionRepository, MessageRepository],
  exports: [OptionRepository],
})
export class OptionsModule {}
