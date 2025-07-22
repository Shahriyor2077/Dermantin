import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Dermantin } from "src/dermantin/entities/dermantin.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Category {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  logo: string;

  @ManyToOne(()=>Dermantin, (dermantin)=>dermantin.category)
  dermantin: Dermantin
}
