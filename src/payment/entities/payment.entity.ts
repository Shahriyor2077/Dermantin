import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Order } from "src/order/entities/order.entity";
import { User } from "src/user/entities/user.entity";

// ENUMLAR SHU FAYL ICHIDA YOZILGAN
export enum PaymentMethod {
  CASH = "CASH",
  CARD = "CARD",
  CLICK = "CLICK",
  PAYME = "PAYME",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
}

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "decimal" })
  amount: number;

  @Column({ type: "enum", enum: PaymentMethod })
  method: PaymentMethod;

  @Column({
    type: "enum",
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @ManyToOne(() => Order, (order) => order.payments, { onDelete: "CASCADE" })
  order: Order;

  @ManyToOne(() => User, (user) => user.payments, { onDelete: "CASCADE" })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
