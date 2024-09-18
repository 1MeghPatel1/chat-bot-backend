import {
  ConflictException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateNlpDto } from './dto/create-nlp.dto';
import { UpdateNlpDto } from './dto/update-nlp.dto';
import { Repository } from 'typeorm';

import { throwError } from 'src/utils/throwError';
import { InjectRepository } from '@nestjs/typeorm';
import { NlpManager } from 'node-nlp';

import { matchSentence } from 'src/utils/matchSentence';
import { Intent } from './entities/intent.entity';
import { Utterances } from './entities/utterance.entity';
import { Answers } from './entities/answer.entity';
import { promisifyForEach } from 'src/utils/promisfiedForLoop';

@Injectable()
export class NlpService implements OnModuleInit {
  private manager: any;
  constructor(
    @InjectRepository(Intent)
    private readonly intentRepository: Repository<Intent>,
    @InjectRepository(Utterances)
    private readonly utteranceRepository: Repository<Utterances>,
    @InjectRepository(Answers)
    private readonly answerRepository: Repository<Answers>,
  ) {
    this.manager = new NlpManager({
      languages: ['en'],
      nlu: { log: false },
      ignoreStopWords: false,
    });
  }

  async onModuleInit() {
    try {
      const data = await this.findAll();
      await this.train(data.allIntentsData);
    } catch (error) {
      throwError(error);
    }
  }

  checkDuplicateUtterance = async (utterances: string[]) => {
    for (const utterance of utterances) {
      const storedUtterance = await this.utteranceRepository.findOne({
        where: { utterance: utterance },
      });
      if (storedUtterance) {
        return true;
      }
    }
  };

  async create(createNlpDto: CreateNlpDto) {
    try {
      const { utterances, intent, answers } = createNlpDto;

      const utteranceCheck = await this.checkDuplicateUtterance(utterances);
      if (utteranceCheck) {
        throw new ConflictException('Utterance already exists');
      }

      let dbIntent: Intent;
      dbIntent = await this.intentRepository.findOne({ where: { intent } });
      if (!dbIntent) {
        dbIntent = this.intentRepository.create({
          intent,
        });
        await this.intentRepository.save(dbIntent);
      }

      const utterancesWithIntent = utterances.map((utterance) => {
        return {
          utterance,
          intent: dbIntent,
        };
      });

      await this.utteranceRepository.save(utterancesWithIntent);

      const answersWithIntent = answers.map((answer) => {
        return {
          answer,
          intent: dbIntent,
        };
      });

      await this.answerRepository.save(answersWithIntent);

      const responseData = await this.intentRepository.findOne({
        where: { id: dbIntent.id },
        relations: ['utterances', 'answers'],
      });

      const data = await this.findAll();
      await this.train(data.allIntentsData);

      return responseData;
    } catch (error) {
      throwError(error);
    }
  }

  async findAll(limit?: number, offset?: number, page?: number) {
    let allIntentsData: Awaited<ReturnType<typeof this.intentRepository.find>>;
    try {
      if (page && limit && !offset) {
        const offset = (page - 1) * limit;
        allIntentsData = await this.intentRepository.find({
          take: limit,
          skip: offset,
          relations: ['utterances', 'answers'],
          order: { id: 'ASC' },
        });
      }
      if (limit && offset) {
        allIntentsData = await this.intentRepository.find({
          take: limit,
          skip: offset,
          relations: ['utterances', 'answers'],
          order: { id: 'ASC' },
        });
      }
      if (!limit && !offset && !page) {
        allIntentsData = await this.intentRepository.find({
          relations: ['utterances', 'answers'],
          order: { id: 'ASC' },
        });
      }
      const allDataCount = await this.intentRepository.count();
      const allIntentsDataWithCount = {
        totalDataCount: allDataCount,
        currentDataCount: allIntentsData.length,
        data: allIntentsData.map((intent) => {
          return {
            ...intent,
            utterancesCount: intent.utterances.length,
            answersCount: intent.answers.length,
          };
        }),
      };

      return { allIntentsData, allIntentsDataWithCount };
    } catch (error) {
      throwError(error);
    }
  }

  async findOneByIntentId(id: number) {
    try {
      const intentData = await this.intentRepository.findOne({
        where: { id },
        relations: ['utterances', 'answers'],
      });
      if (!intentData) {
        throw new NotFoundException();
      }
      return intentData;
    } catch (error) {
      throwError(error);
    }
  }

  async findAllIntents() {
    try {
      const intentData = await this.intentRepository.find({
        order: { id: 'ASC' },
      });
      return intentData;
    } catch (error) {
      throwError(error);
    }
  }

  async updateByIntentId(intentId: number, updateNlpDto: UpdateNlpDto) {
    try {
      const oldData = await this.intentRepository.findOne({
        where: { id: intentId },
        relations: ['utterances', 'answers'],
      });
      if (!oldData) {
        throw new NotFoundException();
      }

      const { utterances, intent, answers } = updateNlpDto;

      if (intent) {
        await this.intentRepository.update({ id: intentId }, { intent });
      }

      const dbIntent = await this.intentRepository.findOne({
        where: { id: intentId },
      });

      const toDelete = {
        utterances: oldData.utterances.filter(
          (utteranceObj) =>
            !utterances
              .filter((utteranceObj) => utteranceObj.id !== null)
              .map((utteranceObj) => utteranceObj.id)
              .includes(utteranceObj.id),
        ),
        answers: oldData.answers.filter(
          (answerObj) =>
            !answers
              .filter((answerObj) => answerObj.id !== null)
              .map((answerObj) => answerObj.id)
              .includes(answerObj.id),
        ),
      };
      if (toDelete.utterances.length > 0) {
        await this.utteranceRepository.remove(toDelete.utterances);
      }
      if (toDelete.answers.length > 0) {
        await this.answerRepository.remove(toDelete.answers);
      }

      const toCreate = {
        utterances: utterances
          .filter((utteranceObj) => utteranceObj.id === null)
          .map((utteranceObj) => ({
            utterance: utteranceObj.utterance,
            intent: dbIntent,
          })),
        answers: answers
          .filter((answerObj) => answerObj.id === null)
          .map((answerObj) => ({
            answer: answerObj.answer,
            intent: dbIntent,
          })),
      };
      if (toCreate.utterances.length > 0) {
        await this.utteranceRepository.save(toCreate.utterances);
      }
      if (toCreate.answers.length > 0) {
        await this.answerRepository.save(toCreate.answers);
      }

      if (utterances.length > 0) {
        await promisifyForEach(utterances, async (utteranceObj: Utterances) => {
          await this.utteranceRepository.update(
            { id: utteranceObj.id },
            { utterance: utteranceObj.utterance },
          );
        });
      }

      if (answers.length > 0) {
        await promisifyForEach(answers, async (answerObj: Answers) => {
          await this.answerRepository.update(
            { id: answerObj.id },
            { answer: answerObj.answer },
          );
        });
      }

      const newData = await this.intentRepository.findOne({
        where: { id: intentId },
        relations: ['utterances', 'answers'],
      });
      return newData;
    } catch (error) {
      throwError(error);
    }
  }

  async removeByIntentId(id: number) {
    try {
      const deletedData = await this.intentRepository.delete({ id });
      if (deletedData.affected === 0) {
        throw new NotFoundException();
      }
      return deletedData;
    } catch (error) {
      throwError(error);
    }
  }

  async findAllUtterances() {
    try {
      const response = await this.utteranceRepository.find();
      return response;
    } catch (error) {
      throwError(error);
    }
  }

  async train(data: Awaited<ReturnType<typeof this.intentRepository.find>>) {
    for (const intentData of data) {
      for (const utteranceObj of intentData.utterances) {
        this.manager.addDocument(
          'en',
          utteranceObj.utterance,
          intentData.intent,
        );
      }
      for (const answerObj of intentData.answers) {
        this.manager.addAnswer('en', intentData.intent, answerObj.answer);
      }
    }
    await this.manager.train();
    this.manager.save();
  }

  async ask(message: string) {
    try {
      const allUtterances = await this.findAllUtterances();
      const matchedUtterance = await matchSentence(
        message,
        allUtterances.map((utteranceObj) => utteranceObj.utterance),
      );

      const matchedUtteranceObj = allUtterances.find(
        (utteranceObj) => utteranceObj.utterance === matchedUtterance,
      );

      if (!matchedUtterance) {
        console.log('No matched utterance');
        return { reply: "Sorry, I don't understand" };
      }

      const response = await this.manager.process('en', matchedUtterance);

      if (!response.answer) {
        return { reply: "Sorry, I don't understand" };
      }

      return {
        id: matchedUtteranceObj.id ? matchedUtteranceObj.id : null,
        reply: response.answer,
      };
    } catch (error) {
      throwError(error);
    }
  }

  getManager() {
    return this.manager;
  }
}
