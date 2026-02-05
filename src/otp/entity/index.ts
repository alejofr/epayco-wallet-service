import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EntityMongoBase } from 'src/common/base/entity-mongo.base';
import type { TypeOtp } from '../types';

@Schema({ collection: 'otp' })
export class OtpEntity extends EntityMongoBase {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    code: string;

    @Prop({ default: 'verify-email', enum: ['verify-email', 'verify-transaction'] as TypeOtp[] })
    typeOtp: TypeOtp;

    @Prop({ required: true })
    expire: number;

    @Prop({ default: true })
    active: boolean;

    @Prop({ type: Object })
    metadata: Record<string, any>;
}

export const OtpSchema = SchemaFactory.createForClass(OtpEntity);
export type OtpDocument = OtpEntity & Document;