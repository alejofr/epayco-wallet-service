import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './modules/users/users.module';
import { WalletsModule } from './modules/wallets/wallets.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { OtpModule } from './otp/otp.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    // config bd mongo
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const MONGO_USERNAME = configService.get<string>('MONGO_DB_USERNAME');
        const MONGO_PASSWORD = configService.get<string>('MONGO_DB_PASSWORD');
        const MONGO_HOST = configService.get<string>('MONGO_DB_HOST');
        const MONGO_DBNAME = configService.get<string>('MONGO_DB_DBNAME');
        const MONGO_PORT = configService.get<string>('MONGO_DB_PORT');
        const APP_ENV = configService.get<string>('APP_ENV') || 'local';

        const MONGO_URI =
          APP_ENV === 'local'
            ? `mongodb://${MONGO_HOST}:${MONGO_PORT}`
            : `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`;

        return {
          uri: MONGO_URI,
          dbName: MONGO_DBNAME,
        };
      },
      inject: [ConfigService],
    }),
    // modules
    UsersModule, 
    WalletsModule, 
    TransactionsModule, 
    OtpModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
