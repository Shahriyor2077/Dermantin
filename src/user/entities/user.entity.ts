import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
