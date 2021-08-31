import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { TokenUser } from './dto/token-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly tasksService: TasksService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async authorizeUserForTask(userId: number, taskId: number) {
        let task = await this.tasksService.findOne(taskId);
        return task.user.id === userId
    }

    async login(user: TokenUser) {
        const payload = { id: user.id, email: user.email }
        return {
            accessToken: this.jwtService.sign(payload)
        }
    }

    async signup(user: CreateUserDto) {
        return this.usersService.create(user);
    }

}
