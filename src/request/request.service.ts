import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRequestDto } from "./dto/create-request.dto";
import { UpdateRequestDto } from "./dto/update-request.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "./entities/request.entity";
import { Repository } from "typeorm";

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request) private readonly requestRepo: Repository<Request>
  ) {}
  create(createRequestDto: CreateRequestDto) {
    return this.requestRepo.save(createRequestDto);
  }

  findAll() {
    return this.requestRepo.find();
  }

  findOne(id: number) {
    return this.requestRepo.findBy({ id });
  }

  async update(id: number, updateRequestDto: UpdateRequestDto) {
    const data = { ...updateRequestDto };
    if (data.status) {
      data.status =
        data.status as import("./entities/request.entity").RequestStatus;
    }
    const request = await this.requestRepo.preload({ id, ...data });
    if (!request) {
      throw new NotFoundException(`${id} ID lik request topilmadi`);
    }
    return this.requestRepo.save(request);
  }

  async remove(id: number) {
    await this.requestRepo.delete(id);
    return id;
  }
}
