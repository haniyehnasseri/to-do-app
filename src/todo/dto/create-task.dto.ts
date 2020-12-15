import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export default class CreateTaskDto {
    @ApiProperty({description:'Enter task description(or enter items later with provided api)  > ', minLength: 3, default: 'preparing for db exam' ,maxLength:16384})
    readonly description: string;
    @ApiProperty({description:'Enter categoryId  > ', default: 1 , type: 'number'})
    readonly categoryId: number;
    @ApiProperty({description:'Enter labelIDs  > ', default: [1] , type: 'number[]'})
    readonly labels: number[];

}