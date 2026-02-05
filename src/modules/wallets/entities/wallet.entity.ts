import { EntityMongoBase } from "src/common/base/entity-mongo.base";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserEntity } from "src/modules/users/entities/user.entity";
import mongoose, { HydratedDocument } from "mongoose";

export type WalletDocument = HydratedDocument<WalletEntity>;

@Schema({ collection: 'wallets' })
export class WalletEntity extends EntityMongoBase {
    @Prop({ default: 0 })
    amount: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: UserEntity.name })
    userId: string;
}

export const WalletSchema = SchemaFactory.createForClass(WalletEntity);
