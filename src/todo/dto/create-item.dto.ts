import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export default class CreateItemDto {
    @ApiProperty({description:'Enter item description  > ', minLength: 5, default: 'Doing HomeWork' ,maxLength:512})
    readonly description: string;
    @ApiProperty({description:'Enter categoryId  > ', default: 1 , type: 'number'})
    readonly categoryId: number;
    @ApiProperty({description:'Enter taskId  > ', default: 1 , type: 'number'})
    readonly taskId: number;

}