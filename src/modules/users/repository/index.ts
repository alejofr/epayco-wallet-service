import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { AbstractRepositoryMongoBase } from 'src/common/base/repository-mongo.base';
import { UserDocument, UserEntity } from '../entities/user.entity';


@Injectable()
export class UserRepository extends AbstractRepositoryMongoBase<UserDocument> {
  constructor(@InjectModel(UserEntity.name) model: Model<UserDocument>) {
    super(model);
  }

  async checkExistence(data: {
    email: string;
    identify: string;
  }): Promise<boolean> {
    const { email, identify } = data;
    const exists = await this.model.exists({
      $or: [{ email }, { identify }],
    });
    return !!exists;
  }

}