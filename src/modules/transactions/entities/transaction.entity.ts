import { EntityMongoBase } from "src/common/base/entity-mongo.base";
import type { Transaction, TypeTransaction } from "../types/transactions.type";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { WalletEntity } from "src/modules/wallets/entities/wallet.entity";
import { TYPE_TRANSACTION_WALLET } from "src/common/consts";

export type TransactionDocument = HydratedDocument<TransactionEntity>;

@Schema({ collection: 'transactions' })
export class TransactionEntity extends EntityMongoBase implements Transaction {
    @Prop({ required: true })
    amount: number;

    @Prop({ enum: TYPE_TRANSACTION_WALLET, type: String, required: true })
    type: TypeTransaction;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: WalletEntity.name, required: true })
    walletId: string;
}

export const TransactionSchema = SchemaFactory.createForClass(TransactionEntity);
