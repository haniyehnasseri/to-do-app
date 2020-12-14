import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export default class LoginDto {
    @ApiProperty({description:'Enter name  > ', minLength: 3, default: 'Harry Potter' ,maxLength:50})
    readonly username: string;
    @ApiProperty({description:'Enter id  > ', default: 'ha...' })
    readonly userId: string;
}