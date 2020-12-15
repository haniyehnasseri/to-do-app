import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import ItemEntity from './item.entity';
import TaskEntity from './task.entity';


@Entity()
export default class CategoryEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({length : 64})
  description: string;

  @OneToMany( type => ItemEntity , item => item.category)
  items: ItemEntity[];

  @OneToMany( type => TaskEntity , task => task.category)
  tasks: TaskEntity[];

}