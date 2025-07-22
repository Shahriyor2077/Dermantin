import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { AdvertisementsService } from "./advertisements.service";
import { Advertisement } from "./entities/advertisement.entity";
import { CreateAdvertisementDto } from "./dto/create-advertisement.dto";
import { UpdateAdvertisementDto } from "./dto/update-advertisement.dto";

@Resolver(() => Advertisement)
export class AdvertisementsResolver {
  constructor(private readonly advertisementsService: AdvertisementsService) {}

  @Mutation(() => Advertisement)
  createAdvertisement(
    @Args("createAdvertisement")
    createAdvertisementDto: CreateAdvertisementDto
  ) {
    return this.advertisementsService.create(createAdvertisementDto);
  }

  @Query(() => [Advertisement], { name: "advertisement" })
  findAll() {
    return this.advertisementsService.findAll();
  }

  @Query(() => Advertisement, { name: "advertisement" })
  findOne(@Args("id", { type: () => ID }) id: number) {
    return this.advertisementsService.findOne(id);
  }

  @Mutation(() => Advertisement)
  updateAdvertisement(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateAdvertisement")
    updateAdvertisementDto: UpdateAdvertisementDto
  ) {
    return this.advertisementsService.update(id, updateAdvertisementDto);
  }

  @Mutation(() => Advertisement)
  removeAdvertisement(@Args("id", { type: () => ID }) id: number) {
    return this.advertisementsService.remove(id);
  }
}
