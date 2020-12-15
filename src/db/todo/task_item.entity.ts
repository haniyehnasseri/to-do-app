import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import TaskEntity from './task.entity';
import ItemEntity from './item.entity';


/*@Entity()
export class TaskItemEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    complete: boolean;
    @ManyToOne(type => TaskEntity, task => task.taskitems, { onDelete : 'CASCADE' , onUpdate: 'CASCADE' })
    task: TaskEntity;
    @ManyToOne(type => ItemEntity, item => item.taskitems, {  onDelete : 'SET NULL' , onUpdate: 'CASCADE' })
    item: ItemEntity;
}*/