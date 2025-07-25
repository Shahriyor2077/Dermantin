import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSocialDto } from './dto/create-social.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Social } from './entities/social.entity';
import { Repository } from 'typeorm';
import { UpdateSocialDto } from './dto/update-social.dto';

@Injectable()
export class SocialsService {
  constructor(@InjectRepository(Social) private readonly socialRepo: Repository<Social>){}
  create(createSocialDto: CreateSocialDto) {
    return this.socialRepo.save(createSocialDto);
  }

  findAll() {
    return this.socialRepo.find();
  }

  findOne(id: number) {
    return this.socialRepo.findBy({id});
  }

  async update(id: number, updateSocialDto: UpdateSocialDto) {
    const social=await this.socialRepo.preload({id})
    if(!social){
      throw new NotFoundException("social topilmadi")
    }
    return this.socialRepo.save(social);
  }

  async remove(id: number) {
    await this.socialRepo.delete(id)
    return id;
  }
}
