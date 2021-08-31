import { BadRequestException, Injectable, InternalServerErrorException, Req, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private tasksRepository: Repository<Task>) { }
  async create(createTaskDto: CreateTaskDto, userId: number) {
    let user = new User();
    user.id = userId;
    let task = this.tasksRepository.create({ ...createTaskDto });
    task.user = user;
    return this.tasksRepository.save(task)
  }

  async findAll() {
    return await this.tasksRepository.find();
  }

  async findOne(id: number) {
    let task = await this.tasksRepository.findOne(id, { relations: ['user'] });
    if (!task)
      throw new BadRequestException('Invalid task id')
    return task;
  }

  async findByUserId(id) {
    return await this.tasksRepository.find({ user: id });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return await this.tasksRepository.update(id, updateTaskDto);
  }

  async remove(id: number) {
    return await this.tasksRepository.delete(id);
  }
}
