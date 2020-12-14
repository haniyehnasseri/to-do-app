import { Body, Controller, Get, Post, Delete, Put, Param } from '@nestjs/common';
import GenreService from './genre.service';
import CreateGenreDto from './dto/create-genre.dto';

@Controller('genre')
export default class GenreController {
  constructor(private readonly genreServices: GenreService) {}
  @Post('post')
  postGenre( @Body() genre: CreateGenreDto) {
      return this.genreServices.insert(genre);
  }
  @Get()
  getAll() {
      return this.genreServices.getAllGenre();
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
      return this.genreServices.deleteGenre(id);
  }

  @Put(':id')
  update(@Body() newGenre: CreateGenreDto, @Param('id') id: number) {
      return this.genreServices.updateGenre(newGenre,id);
  }
}