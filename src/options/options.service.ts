import { Injectable } from '@nestjs/common';
import { OptionRepository } from './options.repository';
import { CreateOptionDto } from './dto/create-option.dto';

@Injectable()
export class OptionsService {
  constructor(private readonly optionRepository: OptionRepository) {}

  async createOption(createOptionDto: CreateOptionDto) {
    return this.optionRepository.createOption(createOptionDto);
  }
}
