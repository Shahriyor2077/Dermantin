import { PartialType } from "@nestjs/mapped-types";
import { CreateRequestDto } from "./create-request.dto";
import { Field, InputType } from "@nestjs/graphql";
import { RequestStatus } from "../entities/request.entity";

@InputType()
export class UpdateRequestDto extends PartialType(CreateRequestDto) {
  @Field()
  user_id?: number;

  @Field()
  text?: string;

  @Field(() => RequestStatus, { nullable: true })
  status?: RequestStatus;
}
