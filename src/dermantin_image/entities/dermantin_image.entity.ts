import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class DermantinImage {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column() // bog'lanadi
  dermantin_id: number;

  @Field()
  @Column()
  image_url: string;

  @Field()
  @Column({ default: false })
  is_main: boolean;
}
