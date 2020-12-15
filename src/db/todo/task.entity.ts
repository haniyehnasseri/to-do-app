import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import CategoryEntity from './category.entity';
import LabelEntity from './label.entity';
//import {TaskItemEntity} from './task_item.entity';
import UserEntity from '../entity/user.entity';
import ItemEntity from './item.entity';

@Entity()
export default class TaskEntity extends BaseEntity 
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable:true, length : 4096 })
  description: string;

  // n:1 relation with books
  @ManyToOne(type => CategoryEntity, category => category.tasks,{onDelete : 'NO ACTION', onUpdate: 'CASCADE', eager:true})
  public category: CategoryEntity;

  @ManyToOne(type => UserEntity, owner => owner.tasks,{nullable: false, onDelete : 'CASCADE', onUpdate: 'CASCADE', eager:true})
  public owner: UserEntity;

  // n:n relation with genre
  @ManyToMany(type => LabelEntity,{ onDelete : 'CASCADE', onUpdate : 'CASCADE', eager: true})
  @JoinTable()
  labels: LabelEntity[];

  @OneToMany( type => ItemEntity , item => item.task, {eager: true})
  items: ItemEntity[];
  /*@OneToMany( type => TaskItemEntity , taskitem => taskitem.task)
  taskitems: TaskItemEntity[];*/
}