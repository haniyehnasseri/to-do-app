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
}