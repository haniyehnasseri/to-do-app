import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthGuard } from '@nestjs/passport'; 
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { type } from 'os';
import { json } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}



  @ApiBody({schema : {properties : {username : {type: 'string', default: "Haniyeh"}, password : {type: 'string', default: "****"} }}}) 
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {

    interface IDataNode {
        id: number;
        title: string;
        node: Array<IDataNode>;
    }
    
    return this.authService.login(req.user);
  }



  /*@UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }*/
}