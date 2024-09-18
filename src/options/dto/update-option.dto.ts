import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateOptionDto {
  @ApiProperty({
    description: 'Option text',
    example: 'Know more about our services',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  option?: string;

  @ApiProperty({
    description: 'Next message id',
    example: 2,
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  nextMessageId: number;

  @ApiProperty({
    description: 'Message id',
    example: 1,
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  message: number;
}
