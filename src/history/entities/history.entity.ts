import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class History {

    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    dermantin_id: number

    @Field()
    @Column()
    user_id: number
}
