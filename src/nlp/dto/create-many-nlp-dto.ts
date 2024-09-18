import { IsArray, IsNotEmpty } from 'class-validator';
import { CreateNlpDto } from './create-nlp.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateManyNlpDto {
  @ApiProperty({
    description: 'NLP Array',
    example: [
      {
        utterance: 'hello',
        intent: 'greeting',
        answer: 'Hi there, how can I help you?',
      },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  nlpArray: CreateNlpDto[];
}
