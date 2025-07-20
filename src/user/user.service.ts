import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password } = createUserDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    return this.userRepo.save({ ...createUserDto, password: hashed_password });
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findBy({ id });
  }

  findUserByEmail(email: string) {
    return this.userRepo.findOneBy({ email } );
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.preload({ id, ...updateUserDto });
    if (!user) {
      throw new NotFoundException(`${id} ID lik user topilmadi`);
    }
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    await this.userRepo.delete(id);
    return id;
  }
}
