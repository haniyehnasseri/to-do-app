import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import ItemEntity from '../todo/item.entity';
import TaskEntity from '../todo/task.entity';
import BookEntity from './book.entity';

@Entity()
export default class UserEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length : 30})
  password: string;

  // 1:n relation with bookEntity   
  @OneToMany( type => BookEntity , book => book.user)
  books: BookEntity[];

  // 1:n relation with bookEntity   
  @OneToMany( type => ItemEntity , item => item.owner)
  items: ItemEntity[];

  // 1:n relation with bookEntity   
  @OneToMany( type => TaskEntity , task => task.owner)
  tasks: TaskEntity[];
}