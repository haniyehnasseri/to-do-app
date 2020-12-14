import { Controller, Post, Body, Get, Delete, Param, Put } from '@nestjs/common';
import {BooksService} from './books.service';
import CreateBookDto from './dto/create-book.dto';
import UpdateBookDto from './dto/create-book.dto';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}
    @Post('post')
    postBook(@Body() book: CreateBookDto) {
        return this.booksService.insert(book);
    }

    @Get()
    getAll() {
        return this.booksService.getAllBooks();
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.booksService.deleteBook(id);
    }

    @Put(':id')
    update(@Body() newBook: CreateBookDto, @Param('id') id: number) {
        return this.booksService.updateBook(newBook,id);
    }



}
