import { Request, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, UsePipes, ValidationPipe, Patch, Req, HttpException, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from 'src/tasks/tasks.service';
import { UsersService } from './users.service';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto'
import { UpdateTaskDto } from 'src/tasks/dto/update-task.dto';
import { OwnTaskGuard } from 'src/auth/task.guard';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private readonly tasksService: TasksService) { }

    @Get('/profile')
    async profile(@Request() req) {
        return await this.userService.findOne(req.user.id);
    }

    @Get('tasks')
    async getTasks(@Request() req) {
        return await this.tasksService.findByUserId(req.user.id)
    }

    @Post('tasks')
    async createTask(@Body() createTaskDto: CreateTaskDto, @Request() req) {
        return await this.tasksService.create(createTaskDto, req.user.id);
    }

    @UseGuards(OwnTaskGuard)
    @Patch('tasks/:id')
    async updateTask(@Param('id', ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto) {
        return await this.tasksService.update(id, updateTaskDto);
    }

    @UseGuards(OwnTaskGuard)
    @Delete('tasks/:id')
    async deleteTask(@Param('id', ParseIntPipe) id: number) {
        return await this.tasksService.remove(id)
    }
}
