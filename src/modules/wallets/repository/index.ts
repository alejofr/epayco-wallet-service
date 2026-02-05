import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepositoryMongoBase } from 'src/common/base/repository-mongo.base';
import { WalletDocument, WalletEntity } from '../entities/wallet.entity';

@Injectable()
export class WalletsRepository extends AbstractRepositoryMongoBase<WalletDocument> {
    constructor(
        @InjectModel(WalletEntity.name) private readonly walletModel: Model<WalletDocument>,
    ) {
        super(walletModel);
    }
}
