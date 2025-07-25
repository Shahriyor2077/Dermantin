import { InputType, Field, Int, PartialType } from "@nestjs/graphql";
import { Social } from "../entities/social.entity";

@InputType()
export class UpdateSocialDto {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field(() => Social, { nullable: true })
  type?: Social;

  @Field({ nullable: true })
  link?: string;

  @Field(() => Int, { nullable: true })
  store_id?: number;
}

