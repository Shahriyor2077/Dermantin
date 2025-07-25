import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Advertisement } from "src/advertisements/entities/advertisement.entity";
import { Category } from "src/category/entities/category.entity";
import { DermantinImage } from "src/dermantin_image/entities/dermantin_image.entity";
import { History } from "src/history/entities/history.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Review } from "../../review/entities/review.entity";
import { Order } from "../../order/entities/order.entity";

@ObjectType()
@Entity()
export class Dermantin {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column() // boglanadi
  store_id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  price: string;

  @Field()
  @Column()
  rating: string;

  @Field()
  @Column()
  class: string;

  @OneToMany(() => Category, (category) => category.dermantin)
  category: Category[];

  @OneToMany(
    () => DermantinImage,
    (dermantin_image) => dermantin_image.dermantin
  )
  dermantin_image: DermantinImage[];

  @OneToMany(() => Advertisement, (advertisement) => advertisement.dermantin)
  advertisement: Advertisement[];

  @OneToMany(() => History, (history) => history.dermantin)
  history: History[];

  @OneToMany(() => Review, (review) => review.dermantin)
  reviews: Review[];

  @OneToMany(() => Order, (order) => order.dermantin)
  orders: Order[];
}
