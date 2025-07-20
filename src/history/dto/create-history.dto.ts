import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class CreateHistoryDto {
  @Field()
  id: number;

  @Field()
  dermantin_id: number;

  @Field()
  user_id: number;
}
