import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RequestService } from "./request.service";
import { CreateRequestDto } from "./dto/create-request.dto";
import { UpdateRequestDto } from "./dto/update-request.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Request } from "./entities/request.entity";

@Resolver("request")
export class RequestResolver {
  constructor(private readonly requestService: RequestService) {}

  @Query(() => [Request])
  findAllRequest() {
    return this.requestService.findAll();
  }

  @Query(() => Request)
  findOneRequest(@Args("id", { type: () => ID }) id: string) {
    return this.requestService.findOne(+id);
  }

  @Mutation(() => Request)
  createRequest(@Args("createRequest") createRequestDto: CreateRequestDto) {
    return this.requestService.create(createRequestDto);
  }

  @Mutation(() => Request)
  updateRequest(
    @Args("id") id: number,
    @Args("updateRequest") updateRequestDto: UpdateRequestDto
  ) {
    return this.requestService.update(+id, updateRequestDto);
  }

  @Mutation(() => Request)
  removeRequest(@Args("id") id: number) {
    return this.requestService.remove(+id);
  }
}
