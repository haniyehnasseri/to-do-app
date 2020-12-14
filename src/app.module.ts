import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { BooksModule } from './books/books.module';
import { GenreModule } from './genre/genre.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import BookEntity from './db/entity/book.entity';
import GenreEntity from './db/entity/genre.entity';
import UserEntity from './db/entity/user.entity';

@Module({
  imports: [HelloModule, BooksModule, GenreModule, UserModule,TypeOrmModule.forFeature([UserEntity, BookEntity , GenreEntity],),TypeOrmModule.forRoot(), AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
