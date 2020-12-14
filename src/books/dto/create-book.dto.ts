import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export default class CreateBookDto {
    @ApiProperty({description:'Enter name  > ', minLength: 3, default: 'Harry Potter' ,maxLength:50})
    readonly name: string;
    @ApiProperty({description:'Enter userID  > ', default: 1 , type: 'number'})
    readonly userID: number;
    @ApiProperty({description:'Enter genreIDs  > ', default: [1,2] , type: 'number[]'})
    readonly genreIDs: number[];
}