import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DermantinImageService } from "./dermantin_image.service";
import { CreateDermantinImageDto } from "./dto/create-dermantin_image.dto";
import { UpdateDermantinImageDto } from "./dto/update-dermantin_image.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { DermantinImage } from "./entities/dermantin_image.entity";

@Resolver("dermantin-image")
export class DermantinImageResolver {
  constructor(private readonly dermantinImageService: DermantinImageService) {}

  @Query(() => [DermantinImage])
  findAllDermantinImage() {
    return this.dermantinImageService.findAll();
  }

  @Query(() => DermantinImage)
  findOneDermantinImage(@Args("id", {type: (()=>ID)}) id: string) {
    return this.dermantinImageService.findOne(+id);
  }

  @Mutation(()=>DermantinImage)
  createDermantinImage(
    @Args("createDermantinImage") createDermantinImageDto: CreateDermantinImageDto
  ) {
    return this.dermantinImageService.create(createDermantinImageDto);
  }

  @Mutation(()=>DermantinImage)
  updateDermantinImage(
    @Args("id", {type: (()=>ID)}) id: number,
    @Args("updateDermantinImage") updateDermantinImageDto: UpdateDermantinImageDto
  ) {
    return this.dermantinImageService.update(+id, updateDermantinImageDto);
  }

  @Delete(":id")
  removeDermantinImage(@Args("id", {type: (()=>ID)}) id: number) {
    return this.dermantinImageService.remove(+id);
  }
}
