import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";

@Entity()
export class Task {
 
 @PrimaryGeneratedColumn('uuid')   
 id:string;


@Column({ unique: true })
 title:string;


 @Column()
 description:string;

 @Column()
 status:TaskStatus;
}