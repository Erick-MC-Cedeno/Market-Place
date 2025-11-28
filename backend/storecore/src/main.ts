import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; 
import * as createRedisStore from 'connect-redis';
import Redis from 'ioredis';
import * as session from 'express-session';
import * as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  app.setGlobalPrefix('secure/api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const RedisStore = createRedisStore(session);
  const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  });

  app.use(
    session({
      store: new RedisStore({ client: redisClient as any }),
      secret: process.env.TOKEN_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: parseInt(process.env.EXPIRE_IN) },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

  await app.listen(process.env.PORT);
}
bootstrap();