import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import {v4 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {

    private tasks:Task[] = [];


    // Get all task
    getAllTasks():Task[] {
        return this.tasks;
    }


    // Filters
    getTasksWithFilters(getTasksFilters:GetTasksFilterDto): Task[]{
        const {status , search} = getTasksFilters

        let tasks = this.getAllTasks();

        if(status) {
            tasks = this.tasks.filter((task) => task.status === status)
        }

        if(search) {
            tasks = this.tasks.filter((tasks) => {
                if(tasks.title.toLowerCase().includes(search) || tasks.description.toLowerCase().includes(search)) {
                    return true;
                }
                return false;
            })
        }

        return tasks;
    }

    // Get task by ID
    getTaskById(id:string):Task | undefined {
        const found = this.tasks.find((task) => task.id === id);

        if(!found) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return found;
    }


    // Create a new task
    createTask(createTaskDto:CreateTaskDto):Task {
        const {title,description} = createTaskDto;
        const task:Task = {
            id:uuid(),
            title,
            description,
            status:TaskStatus.OPEN
        }

          this.tasks.push(task)

          return task;
    }

    // Delete a task
    deleteTask(id:string):void {
       const found = this.getTaskById(id);
       this.tasks = this.tasks.filter((task) => task.id !== found?.id );
    }



    // Update a task
    updateTaskStatus(id:string,status:TaskStatus) {
       const task = this.getTaskById(id);
       task!.status = status
       return task
    }
 }
