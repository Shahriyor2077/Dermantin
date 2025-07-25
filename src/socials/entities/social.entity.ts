import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Store } from "../../store/entities/store.entity";

export enum SocialType {
  TELEGRAM = "telegram",
  INSTAGRAM = "instagram",
  FACEBOOK = "facebook",
  YOUTUBE = "youtube",
}

@Entity({ name: "socials" })
export class Social {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({
    type: "enum",
    enum: SocialType,
  })
  type: SocialType;

  @Column({ type: "text" })
  link: string;

  @ManyToOne(() => Store, (store) => store.socials)
  store: Store[];
}
