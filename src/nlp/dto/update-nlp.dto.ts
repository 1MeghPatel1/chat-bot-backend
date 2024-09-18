import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Utterances } from '../entities/utterance.entity';
import { Answers } from '../entities/answer.entity';

export class UpdateNlpDto {
  @IsNotEmpty()
  intentId: number;

  @ApiProperty({
    description: 'NLP Intent - Classification/Categorization',
    example: 'appointment',
  })
  @IsOptional()
  @IsString()
  intent?: string;

  @ApiProperty({
    description: 'NLP Utterances',
    example: [
      {
        id: 1,
        utterance: 'I want to schedule an appointment',
      },
    ],
    type: [Utterances],
  })
  @IsOptional()
  @IsArray()
  utterances?: Utterances[];

  @ApiProperty({
    description: 'NLP Answer - Bot response',
    example: [
      {
        id: 1,
        answer: 'I will schedule an appointment',
      },
    ],
    type: [Answers],
  })
  @IsOptional()
  @IsArray()
  answers?: Answers[];
}
