import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class MessageDto {
  @ApiProperty({
    description: 'Message answer',
    example: 'Hello! How can I help you?',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  reply: string;
}
