import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Message } from "src/message/entities/message.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Chat {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(()=>User)
  @ManyToOne(()=>User, (user)=>user.chat)
  user: User

  @OneToMany(()=>Message, (message)=>message.chat)
  message: Message[]

}
