import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { HistoryService } from "./history.service";
import { CreateHistoryDto } from "./dto/create-history.dto";
import { UpdateHistoryDto } from "./dto/update-history.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { History } from "./entities/history.entity";

@Resolver("history")
export class HistoryResolver {
  constructor(private readonly historyService: HistoryService) {}

  @Query(() => [History])
  findAllHistory() {
    return this.historyService.findAll();
  }

  @Query(() => History)
  findOneHistory(@Args("id", { type: () => ID }) id: string) {
    return this.historyService.findOne(+id);
  }

  @Mutation(() => History)
  createHistory(@Args("createHistory") createHistoryDto: CreateHistoryDto) {
    return this.historyService.create(createHistoryDto);
  }

  @Mutation(() => History)
  updateHistory(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateHistory") updateHistoryDto: UpdateHistoryDto
  ) {
    return this.historyService.update(+id, updateHistoryDto);
  }

  @Mutation(() => History)
  removeHistory(@Args("id", { type: () => ID }) id: number) {
    return this.historyService.remove(+id);
  }
}
