import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepositoryMongoBase } from 'src/common/base/repository-mongo.base';
import { TransactionDocument, TransactionEntity } from '../entities/transaction.entity';

@Injectable()
export class TransactionsRepository extends AbstractRepositoryMongoBase<TransactionDocument> {
    constructor(
        @InjectModel(TransactionEntity.name) private readonly transactionModel: Model<TransactionDocument>,
    ) {
        super(transactionModel);
    }
}
