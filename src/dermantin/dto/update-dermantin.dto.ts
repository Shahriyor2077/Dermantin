import { PartialType } from "@nestjs/mapped-types";
import { CreateDermantinDto } from "./create-dermantin.dto";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateDermantinDto extends PartialType(CreateDermantinDto) {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  price?: string;

  @Field({ nullable: true })
  rating?: string;

  @Field({ nullable: true })
  class?: string;
}
