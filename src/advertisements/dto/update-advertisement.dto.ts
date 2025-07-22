import { Field, InputType, Int } from "@nestjs/graphql";
import {
  AdvertisementStatus,
  AdvertisementType,
} from "../entities/advertisement.entity";

@InputType()
export class UpdateAdvertisementDto {
  @Field(() => Int, { nullable: true })
  dermantinId?: number;

  @Field(() => Int, { nullable: true })
  discount_percent?: number;

  @Field(() => AdvertisementType, { nullable: true })
  type?: AdvertisementType;

  @Field(() => AdvertisementStatus, { nullable: true })
  status?: AdvertisementStatus;

  @Field({ nullable: true })
  start_date?: Date;

  @Field({ nullable: true })
  end_date?: Date;
}
