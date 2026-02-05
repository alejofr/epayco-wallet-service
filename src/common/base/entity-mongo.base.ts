import { Prop } from '@nestjs/mongoose';
import { EntityBase } from './entity.type.base';

export class EntityMongoBase implements EntityBase {
    @Prop({ default: Date.now })
    created_at: string;

    @Prop({ default: Date.now })
    updated_at: string;
}