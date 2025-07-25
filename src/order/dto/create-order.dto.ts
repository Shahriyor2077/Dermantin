import { IsInt, IsNumber, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  user_id: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  store_id: number;

  @ApiProperty({ example: 3 })
  @IsInt()
  dermantin_id: number;

  @ApiProperty({ example: 150000.0 })
  @IsNumber()
  @Min(0)
  total_price: number;

  @ApiProperty({ example: 50000.0 })
  @IsNumber()
  @Min(0)
  remaning_price: number;
}
