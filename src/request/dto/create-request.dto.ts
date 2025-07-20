import { Field, InputType } from "@nestjs/graphql";
import { RequestStatus } from "../entities/request.entity";
@InputType()
export class CreateRequestDto {
  @Field()
  user_id: number;

  @Field()
  text: string;

  @Field(() => RequestStatus)
  status: RequestStatus;
}
