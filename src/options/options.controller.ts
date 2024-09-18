import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { ApiTags } from '@nestjs/swagger';
import { createResponse } from 'src/utils/createResponse';

@ApiTags('Options')
@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post('create')
  async createOption(@Body(ValidationPipe) createOptionDto: CreateOptionDto) {
    const data = await this.optionsService.createOption(createOptionDto);
    return createResponse(true, 200, 'Successfully created', data);
  }
}
