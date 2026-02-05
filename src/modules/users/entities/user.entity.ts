import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EntityMongoBase } from 'src/common/base/entity-mongo.base';
import { TYPE_OTP_USER } from 'src/common/consts';
import type { OtpPreferenceUser } from '../types/user.type';



@Schema({ collection: 'users' })
export class UserEntity extends EntityMongoBase {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    surname: string;

    @Prop({ required: true, unique: true })
    email: string;


    @Prop({ required: true, unique: true })
    identify: string;

    @Prop({ required: true })
    numberPhone: string;

    @Prop({ default: 'email', enum: TYPE_OTP_USER, type: String })
    otpPreference: OtpPreferenceUser;

}
export const UserSchema = SchemaFactory.createForClass(UserEntity);
export type UserDocument = UserEntity & Document;
