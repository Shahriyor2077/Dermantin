import { Module } from "@nestjs/common";
import { AdvertisementsService } from "./advertisements.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  Advertisement,
  AdvertisementStatus,
  AdvertisementType,
} from "./entities/advertisement.entity";
import { registerEnumType } from "@nestjs/graphql";

registerEnumType(AdvertisementType, {
  name: "AdvertisementType",
});

registerEnumType(AdvertisementStatus, {
  name: "AdvertisementStatus",
});

@Module({
  imports: [TypeOrmModule.forFeature([Advertisement])],
  providers: [AdvertisementsService], 
})
export class AdvertisementsModule {}
