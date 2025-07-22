import { Field, InputType, Int } from "@nestjs/graphql";
import {
  AdvertisementStatus,
  AdvertisementType,
} from "../entities/advertisement.entity";

@InputType()
export class CreateAdvertisementDto {
  @Field(() => Int)
  dermantinId: number; 

  @Field(() => Int)
  discount_percent: number;

  @Field(() => AdvertisementType)
  type: AdvertisementType;

  @Field(() => AdvertisementStatus)
  status: AdvertisementStatus;

  @Field()
  start_date: Date;

  @Field()
  end_date: Date;
}
