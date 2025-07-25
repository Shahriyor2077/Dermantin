import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order)private readonly orderRepo: Repository<Order>){}
  create(createOrderDto: CreateOrderDto) {
    return this.orderRepo.save(createOrderDto);
  }

  findAll() {
    return this.orderRepo.find();
  }

  findOne(id: number) {
    return this.orderRepo.findBy({id});
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order=await this.orderRepo.preload({id, ...updateOrderDto})
    if(!order){
      throw new BadRequestException("order topilmadi")
    }
    return this.orderRepo.save(order);
  }

  async remove(id: number) {
    await this.orderRepo.delete(id)
    return id;
  }
}
