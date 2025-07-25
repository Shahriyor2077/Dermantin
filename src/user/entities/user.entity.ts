import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Chat } from "src/chat/entities/chat.entity";
import { History } from "src/history/entities/history.entity";
import { Request } from "src/request/entities/request.entity";
import { Store } from "src/store/entities/store.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Review } from "../../review/entities/review.entity";
import { Order } from "../../order/entities/order.entity";
import { Payment } from "../../payment/entities/payment.entity";

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  full_name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  phone: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  refresh_token?: string;

  @Field()
  @Column()
  hashed_password: string;

  @Field()
  @Column({ default: false })
  is_active: boolean;

  @OneToMany(() => Chat, (chat) => chat.user)
  chat: Chat[];

  @OneToMany(() => Store, (store) => store.user)
  store: Store[];

  @OneToMany(() => History, (history) => history.user)
  history: History[];

  @OneToMany(() => Request, (request) => request.user)
  request: Request[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];
}

