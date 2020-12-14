import { Injectable } from '@nestjs/common';
import CreateGenreDto from './dto/create-genre.dto';
import GenreEntity from '../db/entity/genre.entity';

@Injectable()
export default class GenreService {
    async insert(genreDetails: CreateGenreDto): Promise<GenreEntity> {

        const genreEntity: GenreEntity = GenreEntity.create();
        const type:string = genreDetails.type;

        genreEntity.type = type;
        await GenreEntity.save(genreEntity);
        return genreEntity;
    }
    async getAllGenre(): Promise<GenreEntity[]> {
        return await GenreEntity.find();
    }

    
  async deleteGenre(id:number):Promise<string> {
    const genre:GenreEntity = await GenreEntity.findOne(id);
    if(genre){
        try {
            await GenreEntity.delete(genre)
            return 'Deleted Successfully'
            
        } catch (error) {
            console.log(error)
            return 'Error'
        }

    }
    else{
        return 'No such ID . '
    }
}

async updateGenre(newGenre: CreateGenreDto, id:number):Promise<string> {
    const genre:GenreEntity = await GenreEntity.findOne(id);
    if(genre){


      if(newGenre.type){
          genre.type =  newGenre.type;
      }

      try {
        await GenreEntity.save(genre);
        return 'Done . ';
          
      } catch (error) {
          console.log(error)
          return 'Error'
          
      }
      
    }
    else{
      return 'No such ID . ' 
    }

    }
}