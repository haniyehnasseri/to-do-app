import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export default class CreateCategoryDto {
    @ApiProperty({description:'Type :  > ', minLength: 3, default: 'Entertainment' ,maxLength:64}) 
    readonly description: string;
}