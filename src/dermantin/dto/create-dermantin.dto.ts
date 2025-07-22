import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateDermantinDto {
  @Field()
  name: string;

  @Field()
  price: string;

  @Field({ nullable: true })
  rating?: string;

  @Field({ nullable: true })
  class?: string;
}
