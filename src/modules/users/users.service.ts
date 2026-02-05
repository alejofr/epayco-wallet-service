import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async create({ email, identify, numberPhone, ...data }: CreateUserDto){
        const isUser = await this.userRepository.checkExistence({ email, identify });

        if (!isUser) {
            await this.userRepository.create({ email, identify, numberPhone, ...data });
        }
    
        return {
          ok: !isUser,
          message: 'Created customer'
        }
    }
}
