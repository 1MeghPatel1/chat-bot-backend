import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeedModule);
  const seedService = appContext.get(SeedService);

  try {
    await seedService.seedMessages();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }

  await appContext.close();
}

bootstrap();
