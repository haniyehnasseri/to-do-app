import { Injectable } from '@nestjs/common';
import UserEntity from '../db/entity/user.entity';
import CreateUserDto from './dto/create-user.dto';
import BookEntity from '../db/entity/book.entity';
import {getConnection} from "typeorm";

@Injectable()
export class UserService {

  async insert(userDetails: CreateUserDto): Promise<UserEntity> {
    const userEntity: UserEntity = UserEntity.create();
    const name : string = userDetails.name;
    userEntity.name = name;
    await UserEntity.save(userEntity);
    return userEntity;
  }
  async getAllUsers(): Promise<UserEntity[]> {
    return await UserEntity.find();
  }
  async getBooksOfUser(userID: number): Promise<BookEntity[]> {
    console.log(typeof(userID));
    const user: UserEntity = await UserEntity.findOne({where: {id: userID}, relations: ['books']});
    return user.books;
  }

  async deleteUser(id:number):Promise<string> {
    const user:UserEntity = await UserEntity.findOne(id);
    if(user){
        await UserEntity.delete(user)
        return 'Deleted Successfully'
    }
    else{
        return 'No such ID . '
    }
}

async updateUser(newUser: CreateUserDto, id:number):Promise<string> {
    const user:UserEntity = await UserEntity.findOne(id);
    if(user){

      if(newUser.name){
          user.name =  newUser.name;
      }

      UserEntity.save(user);

      return 'Done . ';
    }
    else{
      return 'No such ID . ' 
    }

    }
}