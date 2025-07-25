
import { SocialsService } from "./socials.service";
import { CreateSocialDto } from "./dto/create-social.dto";
import { UpdateSocialDto } from "./dto/update-social.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Social } from "./entities/social.entity";

@Resolver("socials")
export class SocialsResolver {
  constructor(private readonly socialsService: SocialsService) {}

  @Mutation(() => Social)
  createSocial(@Args("createSocial") createSocialDto: CreateSocialDto) {
    return this.socialsService.create(createSocialDto);
  }

  @Query(() => [Social])
  findAllSocial() {
    return this.socialsService.findAll();
  }

  @Query(() => Social)
  findOneSocial(@Args("id", { type: () => ID }) id: string) {
    return this.socialsService.findOne(+id);
  }

  @Mutation(() => Social)
  updateSocial(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateSocial") updateSocialDto: UpdateSocialDto
  ) {
    return this.socialsService.update(+id, updateSocialDto);
  }

  @Mutation(() => Social)
  removeSocial(@Args("id", { type: () => ID }) id: number) {
    return this.socialsService.remove(+id);
  }
}
