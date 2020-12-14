import { Controller, Post, Body, Get, Delete, Param, Put, UseGuards,Request } from '@nestjs/common';
import {BooksService} from './books.service';
import CreateBookDto from './dto/create-book.dto';
import UpdateBookDto from './dto/create-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';


@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @UseGuards(JwtAuthGuard)
    @Post('post')
    postBook(@Request() req,@Body() book: CreateBookDto) {
        console.log(req.user);
        return this.booksService.insert(book);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(@Request() req) {
        console.log(req.user)
        return this.booksService.getAllBooks();
    }


    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Request() req,@Param('id') id: number) {
        console.log(req.user)
        return this.booksService.deleteBook(id);
    }


    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Request() req,@Body() newBook: CreateBookDto, @Param('id') id: number) {
        console.log(req.user)
        return this.booksService.updateBook(newBook,id);
    }



}
