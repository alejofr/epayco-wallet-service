import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionEntity, TransactionSchema } from './entities/transaction.entity';
import { TransactionsRepository } from './repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TransactionEntity.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [],
  providers: [TransactionsRepository],
  exports: [TransactionsRepository],
})
export class TransactionsModule { }
