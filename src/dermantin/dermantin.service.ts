import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDermantinDto } from './dto/create-dermantin.dto';
import { UpdateDermantinDto } from './dto/update-dermantin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dermantin } from './entities/dermantin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DermantinService {
  constructor(@InjectRepository(Dermantin) private readonly dermantinRepo: Repository<Dermantin>){}
  create(createDermantinDto: CreateDermantinDto) {
    return this.dermantinRepo.save(createDermantinDto);
  }

  findAll() {
    return this.dermantinRepo.find({relations:["category", "dermantin_image"]});
  }

  findOne(id: number) {
    return this.dermantinRepo.findOneBy({id});
  }

  async update(id: number, updateDermantinDto: UpdateDermantinDto) {
    const dermantin=await this.dermantinRepo.preload({id, ...updateDermantinDto})
    if(!dermantin){
      throw new NotFoundException(`${id} ID lik dermantin topilmadi`);
    }
    return this.dermantinRepo.save(dermantin);
  }

  async remove(id: number) {
    await this.dermantinRepo.delete(id)
    return id;
  }
}
