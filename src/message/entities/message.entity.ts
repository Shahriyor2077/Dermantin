import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Chat } from "src/chat/entities/chat.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Message {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(()=>Chat)
  @ManyToOne(()=>Chat, (chat)=>chat.message)
  chat: Chat

  @Field()
  @Column()
  text: string

  @Field()
  @Column({default: false})
  is_read: boolean

}
