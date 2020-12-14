import { Body, Controller, Get, ParseIntPipe, Post, Put, Delete, Param,UseGuards,Request } from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly usersServices: UserService) {}

//'postUser()' will handle the creating of new User
  
  @Post('post')
  postUser( @Body() user: CreateUserDto) {
    return this.usersServices.insert(user);
  }
// 'getAll()' returns the list of all the existing users in the database
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Request() req) {
    console.log(req.user)
    return this.usersServices.getAllUsers();
  }

//'getBooks()' return all the books which are associated with the user 
// provided through 'userID' by the request  
  @UseGuards(JwtAuthGuard)
  @Get('books')
  getBooks(@Request() req, @Body('userID', ParseIntPipe) userID: number ) {
    console.log(req.user)
    return this.usersServices.getBooksOfUser(userID);
    
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req,@Param('id') id: number) {
    console.log(req.user)
      return this.usersServices.deleteUser(id);
  }


  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Request() req,@Body() newUser: CreateUserDto, @Param('id') id: number) {
    console.log(req.user)
      return this.usersServices.updateUser(newUser,id);
  }
}