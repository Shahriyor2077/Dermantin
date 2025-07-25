import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Dermantin } from "../../dermantin/entities/dermantin.entity";
import { Store } from "../../store/entities/store.entity"; // Agar hali Store yo'q bo‘lsa, keyin yozamiz
import { Payment } from "../../payment/entities/payment.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total_price: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  remaining_price: number;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Store, { onDelete: "CASCADE" })
  store: Store;

  @ManyToOne(() => Dermantin, { onDelete: "CASCADE" })
  dermantin: Dermantin;

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];
}
