import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, JoinTable } from 'typeorm';


@Entity()
export default class LabelEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({length : 32})
  name: string;

}