import { Body, Controller, Get, Post, Delete, Put, Param, UseGuards,Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {ApiBearerAuth, ApiBody} from '@nestjs/swagger';
import {TodoService} from './todo.service';
import CreateLabelDto from './dto/create-label.dto';
import CreateCategoryDto from './dto/create-category.dto';
import CreateItemDto from './dto/create-item.dto';
import CreateTaskDto from './dto/create-task.dto';

@Controller('todo')
export class TodoController {

    constructor(private readonly todoService: TodoService) {}

    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    @Post('post/label')
    insertLabel( @Request() req,@Body() label: CreateLabelDto) {
        console.log(req.user)
        if(req.user.username !== 'admin'){
            return 'You are not admin user ! '
        }
        else{
            try {
                return this.todoService.insertLabel(label);
                
            } catch (error) {
                return 'Error . '
            }
        }        
    }


    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    @Post('post/category')
    insertCategory( @Request() req,@Body() category: CreateCategoryDto) {
        console.log(req.user)
        if(req.user.username !== 'admin'){
            return 'You are not admin user ! '
        }
        else{
            try {
                return this.todoService.insertCategory(category);
                
            } catch (error) {
                return 'Error . '
            }            
        }        
    }


    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    @Post('post/task')
    insertTask( @Request() req,@Body() task: CreateTaskDto) {
        console.log(req.user);        
        try {
            return this.todoService.insertTask(task,req.user.userId);                
        } catch (error) {
            return 'Error . '
        }       
              
    }


    @ApiBody({type: [CreateItemDto] })
    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    @Post('post/item')
    insertItems( @Request() req,@Body() items: CreateItemDto[]) {
        console.log(req.user);        
        try {
            
            return this.todoService.insertItems(items,req.user.userId);                
        } catch (error) {
            return 'Error . '
        }       
              
    }

    /* updates */

    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    @Delete('/task/:id')
    deleteTask(@Request() req, @Param('id') id: number) {
        console.log(req.user)
        return this.todoService.deleteTask(id, req.user.userId);
    }

    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    @Delete('/item/:id')
    deleteItem(@Request() req, @Param('id') id: number) {
        console.log(req.user)
        
        return this.todoService.deleteItem(id, req.user.userId);
    }

    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    @Put('/task/:id')
    updateTask(@Request() req,@Body() newTask: CreateTaskDto, @Param('id') id: number) {
        console.log(req.user)
        return this.todoService.updateTask(newTask,id, req.user.userId);
    }

    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    @Put('/item/:id')
    updateItem(@Request() req,@Body() newItem: CreateItemDto, @Param('id') id: number) {
        console.log(req.user)
        return this.todoService.updateItem(newItem,id, req.user.userId);
    }

    /* show task - item information */


    @Get('label')
    getAllLabel(@Request() req) {
        console.log(req.user)
        return this.todoService.getAllLabel();
    }



    @Get('category')
    getAllCategory(@Request() req) {
        console.log(req.user)
        return this.todoService.getAllCategory();
    }

    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    @Get('tasks')
    getAllTask(@Request() req) {
        console.log(req.user)
        return this.todoService.getAllTask(req.user.userId);
    }

    
    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    @Get('task/:id')
    getTask(@Request() req, @Param('id') id: number) {
        console.log(req.user)
        return this.todoService.getTask(req.user.userId,id);
    }


    @ApiBearerAuth() 
    @UseGuards(JwtAuthGuard)
    @Get('taskItems/:id')
    getItems(@Request() req, @Param('id') id: number) {
        console.log(req.user)
        return this.todoService.getItems(req.user.userId,id);
    }






}
