import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Dermantin } from "src/dermantin/entities/dermantin.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class History {

    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=>User, (user)=>user.history)
    user:User

    @ManyToOne(()=>Dermantin, (dermantin)=>dermantin.history)
    dermantin: Dermantin
}
