import { Injectable } from '@nestjs/common';
import { WalletsRepository } from 'src/modules/wallets/repository';
import { UserRepository } from './repository';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly walletRepository: WalletsRepository
  ) { }

  async create({ email, identify, numberPhone, ...data }: CreateUserDto) {
    const isUser = await this.userRepository.checkExistence({ email, identify });

    if (!isUser) {
      const user = await this.userRepository.create({ email, identify, numberPhone, ...data });
      await this.walletRepository.create({ amount: 0, userId: user._id.toString() })
    }

    return {
      ok: !isUser,
      message: 'Please log in.'
    }
  }
}
