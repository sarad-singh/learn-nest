import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { TasksModule } from 'src/tasks/tasks.module';
import { User } from './user.entity';
import { UsersAuthController } from './users-auth.controller';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        TasksModule,
        forwardRef(() => AuthModule)
    ],
    providers: [UsersService],
    controllers: [UsersController, UsersAuthController],
    exports: [UsersService]
})
export class UsersModule { }
