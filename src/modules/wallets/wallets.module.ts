import { Module, forwardRef } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { MongooseModule } from '@nestjs/mongoose';


import { TransactionsModule } from 'src/modules/transactions/transactions.module';
import { UsersModule } from 'src/modules/users/users.module';
import { OtpModule } from 'src/otp/otp.module';

import { WalletEntity, WalletSchema } from './entities/wallet.entity';
import { WalletsController } from './wallets.controller';
import { WalletsRepository } from './repository';



@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WalletEntity.name, schema: WalletSchema },
    ]),
    forwardRef(() => UsersModule),
    TransactionsModule,
    OtpModule
  ],
  controllers: [WalletsController],
  providers: [WalletsService, WalletsRepository],
  exports: [WalletsRepository],
})
export class WalletsModule { }
