import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import UserEntity from '../entity/user.entity';
import CategoryEntity from './category.entity';
import TaskEntity from './task.entity';
//import {TaskItemEntity} from './task_item.entity';


@Entity()
export default class ItemEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({length : 512})
  description: string;

  @ManyToOne(type => CategoryEntity, category => category.items,{onDelete : 'NO ACTION', onUpdate: 'CASCADE'})
  category: CategoryEntity;

  @ManyToOne(type => UserEntity, owner => owner.items,{nullable: false, onDelete : 'CASCADE', onUpdate: 'CASCADE', eager:true})
  owner: UserEntity;

  @ManyToOne(type => TaskEntity, owner => owner.items,{nullable: false, onDelete : 'CASCADE', onUpdate: 'CASCADE'})
  task: TaskEntity;

  /*@OneToMany( type => TaskItemEntity , taskitem => taskitem.item)
  taskitems: TaskItemEntity[];*/

}