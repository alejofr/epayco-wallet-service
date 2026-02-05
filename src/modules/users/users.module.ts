import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WalletsModule } from 'src/modules/wallets/wallets.module';
import { UserEntity, UserSchema } from './entities/user.entity';
import { UserRepository } from './repository';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';


@Module({
  controllers: [UsersController],
  providers: [UserRepository, UsersService],
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
    WalletsModule
  ],
  exports: [UserRepository]
})
export class UsersModule {}
