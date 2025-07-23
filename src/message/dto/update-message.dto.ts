import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  @Field()
  text?: string;

  @Field({ nullable: true })
  is_read?: boolean;
}
