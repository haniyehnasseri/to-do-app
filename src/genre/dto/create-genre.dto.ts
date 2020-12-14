import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export default class CreateGenreDto {
    @ApiProperty({description:'Type :  > ', minLength: 3, default: 'Action' ,maxLength:10}) 
    readonly type: string;
}