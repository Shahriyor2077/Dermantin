import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private readonly categoryRepo: Repository<Category>){}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepo.save(createCategoryDto);
  }

  findAll() {
    return this.categoryRepo.find();
  }

  findOne(id: number) {
    return this.categoryRepo.findBy({id});
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category=await this.categoryRepo.preload({id, ...updateCategoryDto})
    if(!category){
      throw new NotFoundException(`${id} ID lik category topilmadi`)
    }
    return this.categoryRepo.save(category);
  }

  async remove(id: number) {
    await this.categoryRepo.delete(id)
    return id;
  }
}
