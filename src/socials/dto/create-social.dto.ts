import { InputType, Field, Int, registerEnumType } from "@nestjs/graphql";
import { SocialType } from "../entities/social.entity";

registerEnumType(SocialType, {
  name: "SocialType",
});

@InputType()
export class CreateSocialDto {
  @Field()
  name: string;

  @Field(() => SocialType)
  type: SocialType;

  @Field()
  link: string;

  @Field(() => Int)
  store_id: number;
}
