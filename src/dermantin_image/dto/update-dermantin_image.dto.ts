import { PartialType } from '@nestjs/mapped-types';
import { CreateDermantinImageDto } from './create-dermantin_image.dto';
import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class UpdateDermantinImageDto extends PartialType(CreateDermantinImageDto) {
  @Field()
  dermantin_id?: number;
  @Field()
  image_url?: string;
  @Field()
  is_main?: boolean;
}
