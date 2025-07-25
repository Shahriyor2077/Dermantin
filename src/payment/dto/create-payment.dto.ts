import { IsEnum, IsNumber, IsNotEmpty, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { PaymentMethod, PaymentStatus } from "../entities/payment.entity";

export class CreatePaymentDto {
  @ApiProperty({ example: 150000, description: "To‘lov summasi" })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({
    enum: PaymentMethod,
    example: PaymentMethod.CARD,
    description: "To‘lov usuli",
  })
  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @ApiProperty({ example: 1, description: "Order ID" })
  @IsNumber()
  @IsNotEmpty()
  order_id: number;

  @ApiProperty({ example: 5, description: "Foydalanuvchi IDsi" })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({
    enum: PaymentStatus,
    example: PaymentStatus.PAID,
    description: "To‘lov holati",
  })
  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}
