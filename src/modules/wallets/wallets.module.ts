import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletEntity, WalletSchema } from './entities/wallet.entity';
import { WalletsRepository } from './repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WalletEntity.name, schema: WalletSchema },
    ]),
  ],
  controllers: [WalletsController],
  providers: [WalletsService, WalletsRepository],
  exports: [WalletsService, WalletsRepository],
})
export class WalletsModule { }
