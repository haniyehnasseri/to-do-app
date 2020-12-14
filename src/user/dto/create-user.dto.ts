import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'; 
export default class CreateUserDto {
    @ApiProperty({description:'Enter Your Name > ', minLength: 3, default: 'Ali' ,maxLength:10}) 
    readonly name: string;
    readonly books: number[] ;
}