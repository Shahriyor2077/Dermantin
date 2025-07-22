import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Dermantin } from "src/dermantin/entities/dermantin.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum AdvertisementType {
  DISCOUNT = "DISCOUNT",
  PROMOTION = "PROMOTION",
}

export enum AdvertisementStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SCHEDULED = "SCHEDULED",
}

@ObjectType()
@Entity()
export class Advertisement {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Dermantin)
  @ManyToOne(() => Dermantin, (dermantin) => dermantin.advertisement)
  dermantin: Dermantin;

  @Field()
  @Column()
  discount_percent: number;

  @Field(() => AdvertisementType)
  @Column({
    type: "enum",
    enum: AdvertisementType,
    default: AdvertisementType.DISCOUNT,
  })
  type: AdvertisementType;

  @Field(() => AdvertisementStatus)
  @Column({
    type: "enum",
    enum: AdvertisementStatus,
    default: AdvertisementStatus.SCHEDULED,
  })
  status: AdvertisementStatus;

  @Field()
  @Column()
  start_date: Date;

  @Field()
  @Column()
  end_date: Date;
}
