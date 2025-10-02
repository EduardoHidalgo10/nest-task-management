import { ConflictException, Injectable, NotFoundException , InternalServerErrorException } from '@nestjs/common';
import {TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './task.repository';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {

    constructor(private tasksRepository: TasksRepository) {
    }

  getTasks(filterDto:GetTasksFilterDto , user:User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto,user);
  }
 
    // // Get task by ID
    async getTaskById(id:string , user:User): Promise<Task> {
    const found = await this.tasksRepository.findOne({where: {id,user}});
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} is not found`);
    } else {
      return found;
    }
  }

    // // Create a new task
    async createTask(createTaskDto:CreateTaskDto , user:User):Promise<Task | undefined>{
      try {
        return await this.tasksRepository.createTask(createTaskDto,user);
      } catch (error) {
        console.log(error)
        if(error.code === '23505') {
          throw new ConflictException(`Task with the same title already exists`)
        } else {
          throw new InternalServerErrorException();
        }
      }
    }

    // // Delete a task
    async deleteTask(id:string,user:User):Promise<void>{
       const result = await this.tasksRepository.delete(id);
       
        if(result.affected === 0){
          throw new NotFoundException(`Task with ID ${id} is not found`);

        }
    }



    // // Update a task
    async updateTaskStatus(id:string,status:TaskStatus,user:User):Promise<Task>{
       const task = await this.getTaskById(id,user);
       task.status = status;
       await this.tasksRepository.save(task);

       return task;
    }
 }
