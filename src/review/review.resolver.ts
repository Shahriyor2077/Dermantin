import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ReviewService } from "./review.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Review } from "./entities/review.entity";

@Resolver("review")
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Mutation(() => Review)
  createReview(@Args("createReview") createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Query(() => [Review])
  findAllReview() {
    return this.reviewService.findAll();
  }

  @Query(() => Review)
  findOneReview(@Args("id", { type: () => ID }) id: string) {
    return this.reviewService.findOne(+id);
  }

  @Mutation(() => Review)
  updateReview(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateReview") updateReviewDto: UpdateReviewDto
  ) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Mutation(() => Review)
  removeReview(@Args("id", { type: () => ID }) id: number) {
    return this.reviewService.remove(+id);
  }
}
