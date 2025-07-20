import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateAdminDto {
  @Field()
  full_name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  password: string;

  @Field()
  confirm_password: string

  @Field({ defaultValue: true })
  is_active: boolean;

  @Field({ defaultValue: false })
  is_creator: boolean;
}
