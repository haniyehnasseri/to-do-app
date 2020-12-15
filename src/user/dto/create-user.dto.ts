import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'; 
export default class CreateUserDto {
    @ApiProperty({description:'Enter Your Name > ', minLength: 3, default: 'Ali' ,maxLength:10}) 
    readonly name: string;
    readonly books: number[] ;
    @ApiProperty({description:'Enter Your Pass > ', minLength: 3, default: '****' ,maxLength:30}) 
    readonly password: string;
}