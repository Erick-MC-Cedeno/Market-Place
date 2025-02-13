import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { BullModule } from '@nestjs/bull'; // Importación agregada
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TwoFactorAuthModule } from './two-factor/verification.module';
import { ProductModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: parseInt(process.env.RATE_LIMIT_TTL), 
          limit: parseInt(process.env.RATE_LIMIT ),
        },
      ],
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST ,
        port: parseInt(process.env.REDIS_PORT ),
      },
    }),
    UserModule,
    AuthModule,
    TwoFactorAuthModule,
    ProductModule
    
    
  ],
  providers: [AppService],
})
export class AppModule {}