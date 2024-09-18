import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { NlpService } from './nlp.service';
import { CreateNlpDto } from './dto/create-nlp.dto';
import { UpdateNlpDto } from './dto/update-nlp.dto';
import { createResponse } from 'src/utils/createResponse';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Nlp')
@Controller('nlp')
export class NlpController {
  constructor(private readonly nlpService: NlpService) {}

  @ApiOperation({
    summary: 'Ask NLP',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Hello',
              },
            },
          },
        },
      },
    },
  })
  @Post('ask')
  async ask(@Body() { message }: { message: string }) {
    const reply = await this.nlpService.ask(message);
    return createResponse(true, 200, 'Found successfully', {
      ...reply,
      sender: 'bot',
    });
  }

  @ApiOperation({
    summary: 'Create new NLP',
  })
  @Post('create')
  async create(@Body(ValidationPipe) createNlpDto: CreateNlpDto) {
    const newNlp = await this.nlpService.create(createNlpDto);
    return createResponse(true, 200, 'Successfully created', newNlp);
  }

  @ApiOperation({
    summary: 'Get default message',
  })
  @Get('get/default')
  async getDefaultMessage() {
    return createResponse(true, 200, 'Found successfully', {
      reply: 'Welcome to our hospital! How can I assist you today?😊',
      sender: 'bot',
    });
  }

  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  @Get()
  async findAll(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('page') page?: number,
  ) {
    const data = await this.nlpService.findAll(limit, offset, page);
    return createResponse(
      true,
      200,
      'Found successfully',
      data.allIntentsDataWithCount,
    );
  }

  @ApiOperation({
    summary: 'Get by intent id',
    parameters: [{ name: 'id', in: 'path', description: 'NLP id' }],
  })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    const data = await this.nlpService.findOneByIntentId(+id);
    return createResponse(true, 200, 'Found successfully', data);
  }

  @ApiOperation({
    summary: 'Get all intents',
  })
  @Get('intent/get-intents')
  async getAllIntents() {
    const data = await this.nlpService.findAllIntents();
    return createResponse(true, 200, 'Found successfully', data);
  }

  @ApiOperation({
    summary: 'Update by intent id',
    parameters: [{ name: 'id', in: 'path', description: 'NLP id' }],
  })
  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateNlpDto: UpdateNlpDto,
  ) {
    const data = await this.nlpService.updateByIntentId(+id, updateNlpDto);
    return createResponse(true, 200, 'Updated successfully', data);
  }

  @ApiOperation({
    summary: 'Remove by intent id',
    parameters: [{ name: 'id', in: 'path', description: 'NLP id' }],
  })
  @Delete('remove/:id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    const data = await this.nlpService.removeByIntentId(+id);
    return createResponse(true, 200, 'Deleted successfully', data);
  }
}
