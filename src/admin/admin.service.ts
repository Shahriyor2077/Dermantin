import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Admin } from "./entities/admin.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password } = createAdminDto;
    if (password !== confirm_password) {
      throw new BadRequestException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    return this.adminRepo.save({ ...createAdminDto, hashed_password });
  }

  findAll() {
    return this.adminRepo.find();
  }

  findOne(id: number) {
    return this.adminRepo.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.adminRepo.findOneBy({ email });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const updateData: any = { ...updateAdminDto };
    if (updateAdminDto.password) {
      updateData.hashed_password = await bcrypt.hash(
        updateAdminDto.password,
        7
      );
      delete updateData.password;
      delete updateData.confirm_password;
    }
    await this.adminRepo.update(id, updateData);
    return this.adminRepo.findOneBy({ id });
  }

  remove(id: number) {
    return this.adminRepo.delete(id);
  }

  async updateRefreshToken(id: number, refresh_token: string) {
    const updateAdmin = await this.adminRepo.update({ refresh_token }, { id })
    return updateAdmin;
  }
}
