import { Body, Controller, Get, Post, Delete, Put, Param, UseGuards,Request } from '@nestjs/common';
import GenreService from './genre.service';
import CreateGenreDto from './dto/create-genre.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('genre')
export default class GenreController {
  constructor(private readonly genreServices: GenreService) {}

  @UseGuards(JwtAuthGuard)
  @Post('post')
  postGenre( @Request() req,@Body() genre: CreateGenreDto) {
      console.log(req.user)
      return this.genreServices.insert(genre);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@Request() req) {
    console.log(req.user)
      return this.genreServices.getAllGenre();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req,@Param('id') id: number) {
    console.log(req.user)
      return this.genreServices.deleteGenre(id);
  }


  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Request() req,@Body() newGenre: CreateGenreDto, @Param('id') id: number) {
    console.log(req.user)
      return this.genreServices.updateGenre(newGenre,id);
  }
}