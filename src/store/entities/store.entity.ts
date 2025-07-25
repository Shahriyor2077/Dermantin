import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Social } from "../../socials/entities/social.entity";
import { Order } from "../../order/entities/order.entity";

export enum Region {
  TASHKENT_CITY = "TASHKENT_CITY",
  TASHKENT = "TASHKENT",
  ANDIJAN = "ANDIJAN",
  FERGANA = "FERGANA",
  NAMANGAN = "NAMANGAN",
  SAMARKAND = "SAMARKAND",
  BUKHARA = "BUKHARA",
  NAVOIY = "NAVOIY",
  KHOREZM = "KHOREZM",
  KASHKADARYO = "KASHKADARYO",
  SURKHANDARYO = "SURKHANDARYO",
  JIZZAKH = "JIZZAKH",
  SYRDARYO = "SYRDARYO",
  KARAKALPAKSTAN = "KARAKALPAKSTAN",
}

registerEnumType(Region, {
  name: "Region",
});

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

registerEnumType(Status, {
  name: "Status",
});

@ObjectType()
@Entity()
export class Store {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.store)
  user: User;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  logo_url: string;

  @Field(() => Region)
  @Column({
    type: "enum",
    enum: Region,
  })
  region: Region;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  reting_id: number;

  @Field(() => Status)
  @Column({
    type: "enum",
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @OneToMany(() => Social, (social) => social.store)
  socials: Social[];

  @OneToMany(() => Order, (order) => order.store)
  orders: Order[];
}
