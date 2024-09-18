import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { MessageRepository } from 'src/messages/messages.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from 'src/config/typeorm.config';

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
  ],
  providers: [SeedService, MessageRepository],
  exports: [SeedService],
})
export class SeedModule {}
