import { PartialType } from "@nestjs/mapped-types";
import { CreateAdminDto } from "./create-admin.dto";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateAdminDto extends PartialType(CreateAdminDto) {
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

  @Field({ defaultValue: true })
  is_active?: boolean;

  @Field({ defaultValue: false })
  is_creator?: boolean;
}
