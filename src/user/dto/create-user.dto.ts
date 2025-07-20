import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserDto {
  @Field()
  full_name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  password: string;

  @Field()
  confirm_password: string;

  @Field({ defaultValue: false })
  is_active: boolean;
  
}
