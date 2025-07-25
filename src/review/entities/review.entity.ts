import { ObjectType, Field, Int } from "@nestjs/graphql";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Dermantin } from "src/dermantin/entities/dermantin.entity";

@ObjectType()
@Entity("reviews")
export class Review {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  ranking: number;

  // USER bilan bog‘lanish
  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Dermantin, (dermantin) => dermantin.reviews, { onDelete: 'CASCADE' })
  dermantin: Dermantin;
}
