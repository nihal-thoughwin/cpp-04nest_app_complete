import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exception/http.Filter';
import { AuthGuard } from './guards/auth.guards';
import { loggingInterceptor } from './interceptors/logging.interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // for global use of pipe
  // app.useGlobalFilters(new HttpExceptionFilter()); // for global use of expection filters
  // app.useGlobalGuards(new AuthGuard()); //global gaurds for whole apa
  // app.useGlobalInterceptors(new loggingInterceptor());
  await app.listen(3000);
}
bootstrap();
