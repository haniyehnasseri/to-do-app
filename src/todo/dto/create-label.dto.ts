import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export default class CreateLabelDto {
    @ApiProperty({description:'Type :  > ', minLength: 3, default: 'Important' ,maxLength:32}) 
    readonly name: string;
}