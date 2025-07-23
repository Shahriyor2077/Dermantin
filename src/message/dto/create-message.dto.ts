import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateMessageDto {
  @Field()
  text: string;

  @Field({nullable: true})
  is_read: boolean;
}
