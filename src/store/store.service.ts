import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { ReadPosition } from 'fs';
import { Repository } from 'typeorm';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store) private readonly storeRepo: Repository<Store>
  ){}
  create(createStoreDto: CreateStoreDto) {
    return this.storeRepo.save(createStoreDto);
  }

  findAll() {
    return this.storeRepo.find();
  }

  findOne(id: number) {
    return this.storeRepo.findBy({id});
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    const store=await this.storeRepo.preload({id, ...updateStoreDto})
    if(!store){
      throw new NotFoundException("Bunday Store topilmadi")
    }
    return this.storeRepo.save(store);
  }

  async remove(id: number) {
    await this.storeRepo.delete(id)
    return id;
  }
}
