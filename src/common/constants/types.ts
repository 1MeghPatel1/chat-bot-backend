import { Answers } from 'src/nlp/entities/answer.entity';
import { Intent } from 'src/nlp/entities/intent.entity';
import { Utterances } from 'src/nlp/entities/utterance.entity';
import { TypeORMError } from 'typeorm';

export interface CustomTypeOrmError extends TypeORMError {
  code: string;
}

export interface nlpResponseData {
  intent: null | Intent;
  utterances: Utterances[];
  answers: Answers[];
}
