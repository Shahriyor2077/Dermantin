import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(@InjectRepository(Message) private readonly messageRepo: Repository<Message>){}
  create(createMessageDto: CreateMessageDto) {
    return this.messageRepo.save(createMessageDto);
  }

  findAll() {
    return this.messageRepo.find();
  }

  findOne(id: number) {
    return this.messageRepo.findBy({id});
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const message=await this.messageRepo.preload({id, ...updateMessageDto})
    if(!message){
      throw new NotFoundException("Bunday message topilmadi")
    }
    return this.messageRepo.save(message);
  }

  async remove(id: number) {
    await this.messageRepo.delete(id)
    return id;
  }
}
