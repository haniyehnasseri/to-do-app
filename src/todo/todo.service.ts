import { Injectable } from '@nestjs/common';
import CreateLabelDto from './dto/create-label.dto';
import CreateCategoryDto from './dto/create-category.dto';
import LabelEntity from '../db/todo/label.entity';
import CategoryEntity from '../db/todo/category.entity';
import CreateItemDto from './dto/create-item.dto';
import ItemEntity from '../db/todo/item.entity';
import UserEntity from 'src/db/entity/user.entity';
import CreateTaskDto from './dto/create-task.dto';
import TaskEntity from 'src/db/todo/task.entity';

@Injectable()
export class TodoService {

    async insertLabel(labelDetails: CreateLabelDto): Promise<LabelEntity> {

        const labelEntity: LabelEntity = LabelEntity.create();

        labelEntity.name = labelDetails.name;
        await LabelEntity.save(labelEntity);
        return labelEntity;
    }

    async insertCategory(categoryDetails: CreateCategoryDto): Promise<CategoryEntity> {

        const categoryEntity: CategoryEntity = CategoryEntity.create();

        categoryEntity.description = categoryDetails.description;
        await CategoryEntity.save(categoryEntity);
        return categoryEntity;
    }

    async insertItems(itemsDetails: CreateItemDto[], userId:string): Promise<ItemEntity[] | string> {

        const userID:number = Number(userId);
        const response:ItemEntity[] = []

        for(let i =0; i < itemsDetails.length; i++){
            
            const task:TaskEntity = await TaskEntity.findOne(itemsDetails[i].taskId)

            if(task.owner.id !== userID ){
                return 'You are not the owner of the task'
            }
            
            const validation:ItemEntity[] = await ItemEntity.find({where:{description : itemsDetails[i].description, task: task}})
            if((task) && (validation.length === 0) ){
                // repetitive  tasks has not been checked :D //
                const itemEntity: ItemEntity = ItemEntity.create();
                itemEntity.owner = await UserEntity.findOne(userID);
                itemEntity.category = await CategoryEntity.findOne(itemsDetails[i].categoryId);
                itemEntity.description = itemsDetails[i].description;
                itemEntity.task = task;
                await ItemEntity.save(itemEntity);
                response.push(itemEntity);
            }

            else{
                console.log('problem with table or repetitive item :D')
            }

        }
        return response        
    }

    async insertTask(taskDetails: CreateTaskDto, userId:string): Promise<TaskEntity> {

        const userID:number = Number(userId);

        const taskEntity:TaskEntity  = TaskEntity.create();
        taskEntity.owner = await UserEntity.findOne(userID);
        taskEntity.category = await CategoryEntity.findOne(taskDetails.categoryId);
        taskEntity.description = taskDetails.description;
        taskEntity.labels=[];
        for ( let i = 0; i < taskDetails.labels.length ; i++)
        {
                 const label = await LabelEntity.findOne(taskDetails.labels[i]);
                 taskEntity.labels.push(label);
        }
        await TaskEntity.save(taskEntity);

        return taskEntity;
    }


    async deleteTask(taskId:number,  userId:string): Promise<string> {

        const task:TaskEntity = await TaskEntity.findOne(taskId);
        const userID:number = Number(userId);
        
        if(!task){
            return 'no such task'
        }
        
        if(task.owner.id !== userID ){
            return 'You are not the owner of the task'
        }

        

        await TaskEntity.remove(task)
        
        return 'Deleted Successfully';
    
        
    }


    async deleteItem(itemId:number,  userId:string): Promise<string> {

        const item:ItemEntity = await ItemEntity.findOne(itemId);
        //console.log(item)
        const userID:number = Number(userId);
        //console.log(userID)
        if(!item){
            return 'no such item'
        }
        if(item.owner.id !== userID ){
            //console.log(3)
            return 'You are not the owner of the item/task'
        }

        //console.log(4)

        await ItemEntity.delete(item)
        return 'Deleted Successfully';        
    }


    async updateTask(newTask: CreateTaskDto, taskId:number,  userId:string):Promise<string> {
        
        const task:TaskEntity = await TaskEntity.findOne(taskId);
        const userID:number = Number(userId);
        if(!task){
            return 'no such task'
        }
        //console.log(Number(task.owner.id))
        if(task.owner.id !== userID ){
            return 'You are not the owner of the task'
        }

        if(newTask.description){
            task.description = newTask.description;
        }

        if(newTask.categoryId){
            try {
                task.category = await CategoryEntity.findOne(newTask.categoryId);
                
            } catch (error) {
                console.log(error);
            }            
        }

        const labels = [];
        if(newTask.labels && newTask.labels.length > 0){
            for ( let i = 0; i < newTask.labels.length ; i++)
            {
                labels.push({id : newTask.labels[i]});
            }
        }

        if(labels.length > 0){
            try {
                task.labels = labels; 
                
            } catch (error) {
                console.log(error);
            }            
        }

        await TaskEntity.save(task);

        return 'Successful update . '
  
    }



    async updateItem(newItem: CreateItemDto, itemId:number,  userId:string):Promise<string> {
        
        const item:ItemEntity = await ItemEntity.findOne(itemId);
        const userID:number = Number(userId);
        if(!item){
            return 'no such item'
        }
        
        if(item.owner.id !== userID ){
            return 'You are not the owner of the item/task'
        }

        if(newItem.description){
            item.description = newItem.description;
        }

        if(newItem.categoryId){
            try {
                item.category = await CategoryEntity.findOne(newItem.categoryId);
                
            } catch (error) {
                console.log(error);
            }            
        }


        await ItemEntity.save(item);

        return 'Successful update . '
  
    }

    async getAllLabel(): Promise<LabelEntity[]> {
        return await LabelEntity.find();
    }

    async getAllCategory(): Promise<CategoryEntity[]> {
        return await CategoryEntity.find();
    }

    async getAllTask(userId:string): Promise<TaskEntity[]> {
        const userID:number = Number(userId);
        return await TaskEntity.find({where: {owner : await UserEntity.findOne(userID)}});
    }

    async getTask(userId:string, taskId:number): Promise<TaskEntity> {
        const userID:number = Number(userId);
        return await TaskEntity.findOne({where: {owner : await UserEntity.findOne(userID), id:taskId}});
    }

    async getItems(userId:string, taskId:number): Promise<ItemEntity[]> {
        const userID:number = Number(userId);
        return await (await TaskEntity.findOne({where: {owner : await UserEntity.findOne(userID), id:taskId}})).items;
    }

    
}
