
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Order } from "./entities/order.entity";

@Resolver("order")
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  createOrder(@Args("createOrder") createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Query(() => [Order])
  findAllOrder() {
    return this.orderService.findAll();
  }

  @Query(() => Order)
  findOneOrder(@Args("id", { type: () => ID }) id: string) {
    return this.orderService.findOne(+id);
  }

  @Mutation(() => Order)
  updateOrder(
    @Args("id", { type: () => ID }) id: number,
    @Args() updateOrderDto: UpdateOrderDto
  ) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Mutation(() => Order)
  removeOrder(@Args("id", { type: () => ID }) id: number) {
    return this.orderService.remove(+id);
  }
}
