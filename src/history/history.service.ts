import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from './entities/history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryService {
  constructor(@InjectRepository(History)private readonly historyRepo: Repository<History>){}
  create(createHistoryDto: CreateHistoryDto) {
    return this.historyRepo.save(createHistoryDto);
  }

  findAll() {
    return this.historyRepo.find();
  }

  findOne(id: number) {
    return this.historyRepo.findBy({id});
  }

  async update(id: number, updateHistoryDto: UpdateHistoryDto) {
    const history=await this.historyRepo.preload({id, ...updateHistoryDto})
    if(!history){
      throw new NotFoundException( `${id} ID lik history topilmadi`)
    }
    return this.historyRepo.save(history);
  }

  async remove(id: number) {
    await this.historyRepo.delete(id)
    return id
  }
}
