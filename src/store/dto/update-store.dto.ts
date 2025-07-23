import { InputType, Field } from "@nestjs/graphql";
import { Region, Status } from "../entities/store.entity";

@InputType()
export class UpdateStoreDto {
  @Field()
  name?: string;

  @Field()
  logo_url?: string;

  @Field()
  description?: string;

  @Field()
  reting_id?: number;

  @Field(() => Region)
  region?: Region;

  @Field(() => Status, { nullable: true })
  status?: Status;
}
