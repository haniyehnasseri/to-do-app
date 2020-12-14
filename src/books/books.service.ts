import { Injectable } from '@nestjs/common';

import BookEntity from '../db/entity/book.entity';
import CreateBookDto from './dto/create-book.dto';
import UserEntity from '../db/entity/user.entity';
import { createQueryBuilder, getConnection } from 'typeorm';
import GenreEntity from '../db/entity/genre.entity';
import UpdateBookDto from './dto/create-book.dto';

@Injectable()
export class BooksService {

  async insert(bookDetails: CreateBookDto): Promise<BookEntity> {
    const { name , userID , genreIDs } = bookDetails;
    const book = new BookEntity();
    book.name = name;
    book.user = await UserEntity.findOne(userID) ;
    book.genres=[];
    for ( let i = 0; i < genreIDs.length ; i++)
    {
             const genre = await GenreEntity.findOne(genreIDs[i]);
             book.genres.push(genre);
    }
    await book.save();
    return book;
  }
  async getAllBooks(): Promise<BookEntity[] > {
    return BookEntity.find();
  }

  async deleteBook(id:number):Promise<string> {
      const book:BookEntity = await BookEntity.findOne(id);
      if(book){
          await BookEntity.delete(book)
          return 'Deleted Successfully'
      }
      else{
          return 'No such ID . '
      }
  }

  async updateBook(newBook: CreateBookDto, id:number):Promise<string> {
      const book:BookEntity = await BookEntity.findOne(id);
      console.log(newBook.userID);
      if(book){


        const genres = [];
        if(newBook.genreIDs && newBook.genreIDs.length > 0){
            for ( let i = 0; i < newBook.genreIDs.length ; i++)
            {
                genres.push({id : newBook.genreIDs[i]});
            }
        }

        /*await getConnection()
            .createQueryBuilder()
            .update(BookEntity)
            .set({user: {id: newBook.userID}})
            .where("id = :id", { id: id })
            .execute();*/

        if(newBook.name){
            book.name =  newBook.name;
        }
        if(genres.length > 0){
            try {
                book.genres = genres; 
                
            } catch (error) {
                console.log(error);
            }
            
        }
        if(newBook.userID){
            try {
                book.user = await UserEntity.findOne(newBook.userID);
                
            } catch (error) {
                console.log(error);
            }
            
        }

        BookEntity.save(book);

        return 'Done . ';
      }
      else{
        return 'No such ID . ' 
      }

  }
}
