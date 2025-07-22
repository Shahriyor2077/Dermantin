import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAdvertisementDto } from "./dto/create-advertisement.dto";
import { UpdateAdvertisementDto } from "./dto/update-advertisement.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Advertisement } from "./entities/advertisement.entity";


@Injectable()
export class AdvertisementsService {
  constructor(
    @InjectRepository(Advertisement)
    private readonly adRepo: Repository<Advertisement>
  ) {}
  create(createAdvertisementDto: CreateAdvertisementDto) {
    return this.adRepo.save(createAdvertisementDto);
  }

  findAll() {
    return this.adRepo.find();
  }

  findOne(id: number) {
    return this.adRepo.findOneBy({ id });
  }

  async update(id: number, updateAdvertisementDto: UpdateAdvertisementDto) {
    const advertisement = await this.adRepo.preload({ id, ...updateAdvertisementDto });
    if (!advertisement) {
      throw new NotFoundException(`${id} ID lik advertisement topilmadi`);
    }
    return this.adRepo.save(advertisement);
  }

  remove(id: number) {
    return `This action removes a #${id} advertisement`;
  }
}
