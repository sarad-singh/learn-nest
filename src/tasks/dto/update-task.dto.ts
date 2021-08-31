import { Optional } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsString } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsString()
    title: string;

    @IsString()
    description: string;
}
