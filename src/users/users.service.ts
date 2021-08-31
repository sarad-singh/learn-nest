import { BadRequestException, Injectable, InternalServerErrorException, ParseUUIDPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) { }

    async findAll() {
        let users = await this.usersRepository.find({ relations: ['tasks'] });
        if (!users)
            throw new InternalServerErrorException;
        return users;
    }

    async findOne(id: number) {
        let user = await this.usersRepository.findOne(id, { relations: ['tasks'] });
        if (!user)
            throw new BadRequestException('Invalid user')
        return user
    }

    async findOneByEmail(email: string) {
        let user = await this.usersRepository.findOne({ email });
        if (!user)
            throw new BadRequestException('Invalid user')
        return user
    }

    async create(user: CreateUserDto) {
        let createdUser = await this.usersRepository.save(user)
        if (!createdUser)
            throw new InternalServerErrorException;
    }

    async delete(id: number) {
        let deletedUser = await this.usersRepository.delete(id)
        if (!deletedUser)
            throw new InternalServerErrorException;
    }

}
