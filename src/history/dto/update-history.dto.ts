import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoryDto } from './create-history.dto';
import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class UpdateHistoryDto extends PartialType(CreateHistoryDto) {
  @Field()
  id?: number;

  @Field()
  dermantin_id?: number;

  @Field()
  user_id?: number;
}
