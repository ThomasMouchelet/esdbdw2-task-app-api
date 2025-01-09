import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return this.taskRepository.save(createTaskDto);
  }

  findAll(): Promise<TaskEntity[]> {
    return this.taskRepository.find();
  }

  async findOne(id: number): Promise<TaskEntity> {
    const task = await this.taskRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskEntity> {
    const task = await this.findOne(id);

    const updateTask = {
      ...task,
      ...updateTaskDto,
    };

    await this.taskRepository.update(id, updateTask);

    return updateTask;
  }

  async remove(id: number): Promise<any> {
    await this.findOne(id);

    return this.taskRepository.delete(id);
  }
}
