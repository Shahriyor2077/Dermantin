import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDermantinImageDto } from './dto/create-dermantin_image.dto';
import { UpdateDermantinImageDto } from './dto/update-dermantin_image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DermantinImage } from './entities/dermantin_image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DermantinImageService {
  constructor(@InjectRepository(DermantinImage) private readonly dermatinImageRepo: Repository<DermantinImage>){}
  create(createDermantinImageDto: CreateDermantinImageDto) {
    return this.dermatinImageRepo.save(createDermantinImageDto);
  }

  findAll() {
    return this.dermatinImageRepo.find();
  }

  findOne(id: number) {
    return this.dermatinImageRepo.findBy({id});
  }

  async update(id: number, updateDermantinImageDto: UpdateDermantinImageDto) {
    const dermantinImage=await this.dermatinImageRepo.preload({id, ...updateDermantinImageDto})
    if(!dermantinImage){
      throw new NotFoundException(`${id} ID lik dermaintinImage topilmadi`)
    }
    return this.dermatinImageRepo.save(dermantinImage);
  }

  async remove(id: number) {
    await this.dermatinImageRepo.delete(id)
    return id;
  }
}
