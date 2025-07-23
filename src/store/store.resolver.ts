
import { StoreService } from "./store.service";
import { CreateStoreDto } from "./dto/create-store.dto";
import { UpdateStoreDto } from "./dto/update-store.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Store } from "./entities/store.entity";
import { argsToArgsConfig } from "graphql/type/definition";

@Resolver("store")
export class StoreResolver {
  constructor(private readonly storeService: StoreService) {}

  @Mutation(() => Store)
  createStore(@Args("createStore") createStoreDto: CreateStoreDto) {
    return this.storeService.create(createStoreDto);
  }

  @Query(()=>[Store])
  findAllStore() {
    return this.storeService.findAll();
  }

  @Query(()=>Store)
  findOneStore(@Args("id", {type: (()=>ID)}) id: string) {
    return this.storeService.findOne(+id);
  }

  @Mutation(()=>Store)
  updateStore(@Args("id", {type: (()=>ID)}) id: number, @Args("updateStore") updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(+id, updateStoreDto);
  }

  @Mutation(()=>Store)
  removeStore(@Args("id", {type: (()=>ID)}) id: number) {
    return this.storeService.remove(+id);
  }
}
