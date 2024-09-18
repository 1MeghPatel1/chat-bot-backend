import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateNlpDto {
  @ApiProperty({
    description: 'NLP Intent - Classification/Categorization',
    example: 'appointment',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  intent: string;

  @ApiProperty({
    description: 'NLP Utterances',
    example: ['I want to schedule an appointment'],
    type: [String],
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  utterances: string[];

  @ApiProperty({
    description: 'NLP Answer - Bot response',
    example: ['I will schedule an appointment'],
    type: [String],
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  answers: string[];
}
