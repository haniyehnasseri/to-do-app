import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import UserEntity from '../db/entity/user.entity';

import { JwtService } from '@nestjs/jwt';
import passport from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log("hello");  
    const user = await UserEntity.findOne({where : {name:username}});
    if (user && user.password === pass) {
      //const { id, ...result } = user;
      return user;
    }
    else{
        console.log(" wrong .")
    }
    return null;
  }

  async login(user: any) {

    const payload = { username: user.name, sub: String(user.id) };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
