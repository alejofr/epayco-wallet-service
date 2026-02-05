import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionEntity, TransactionSchema } from './entities/transaction.entity';
import { TransactionsRepository } from './repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TransactionEntity.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionsRepository],
  exports: [TransactionsService, TransactionsRepository],
})
export class TransactionsModule { }
