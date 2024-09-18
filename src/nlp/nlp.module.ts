import { Module } from '@nestjs/common';
import { NlpService } from './nlp.service';
import { NlpController } from './nlp.controller';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Intent } from './entities/intent.entity';
import { Utterances } from './entities/utterance.entity';
import { Answers } from './entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Intent, Utterances, Answers])],
  controllers: [NlpController],
  providers: [NlpService, Repository],
})
export class NlpModule {}
