import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OptionsModule } from './options/options.module';
import { MessageRepository } from './messages/messages.repository';
import { NlpModule } from './nlp/nlp.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        await typeOrmConfig(configService),
    }),
    MessagesModule,
    OptionsModule,
    NlpModule,
  ],
  providers: [ConfigService, MessageRepository],
  exports: [ConfigService],
})
export class AppModule {}
