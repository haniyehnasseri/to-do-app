import { Body, Controller, Get, ParseIntPipe, Post, Put, Delete, Param,UseGuards,Request } from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {ApiBearerAuth, ApiBody} from '@nestjs/swagger';
import { application, json } from 'express';


@Controller('users')
export class UserController {
  constructor(private readonly usersServices: UserService) {}


  
  @Post('post')
  postUser( @Body() user: CreateUserDto) {
    return this.usersServices.insert(user);
  }


  @Get()
  @ApiBearerAuth() 
  @UseGuards(JwtAuthGuard)
  getAll(@Request() req) {
    console.log(req.user)
    return this.usersServices.getAllUsers();
  }


  @ApiBody({description: 'userID', type:Number})
  @ApiBearerAuth() 
  @UseGuards(JwtAuthGuard)
  @Get('books')
  getBooks(@Request() req, @Body('userID', ParseIntPipe) userID: number ) {
    console.log(req.user)
    return this.usersServices.getBooksOfUser(userID);
    
  }

  @ApiBearerAuth() 
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req,@Param('id') id: number) {
    console.log(req.user)
      return this.usersServices.deleteUser(id);
  }

  @ApiBearerAuth() 
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Request() req,@Body() newUser: CreateUserDto, @Param('id') id: number) {
    console.log(req.user)
      return this.usersServices.updateUser(newUser,id);
  }
}