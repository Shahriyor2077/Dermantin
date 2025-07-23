import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Dermantin } from "src/dermantin/entities/dermantin.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class DermantinImage {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(()=>Dermantin)
  @ManyToOne(()=>Dermantin, (dermantin)=>dermantin.dermantin_image)
  dermantin: Dermantin

  @Field()
  @Column()
  image_url: string;

  @Field()
  @Column({ default: false })
  is_main: boolean;
}
