import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum RequestStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

@ObjectType()
@Entity()
export class Request {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  user_id: number;

  @Field()
  @Column()
  text: string;

  @Field()
  @Column({
    type: "enum",
    enum: RequestStatus,
    default: RequestStatus.PENDING,
  })
  status: RequestStatus;
}
