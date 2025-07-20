import { PartialType } from "@nestjs/mapped-types";
import { Field, InputType } from "@nestjs/graphql";
import { CreateUserDto } from "./create-user.dto";

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Field()
  full_name?: string;

  @Field()
  email?: string;

  @Field()
  phone?: string;

  @Field()
  password?: string;

  @Field({ nullable: true })
  hashed_password?: string;

  @Field({ defaultValue: false })
  is_active?: boolean;

}
