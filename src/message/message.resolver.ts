
import { MessageService } from "./message.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Message } from "./entities/message.entity";

@Resolver("message")
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Mutation(() => Message)
  createMessage(@Args("createMessage") createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Query(() => [Message])
  findAllMessage() {
    return this.messageService.findAll();
  }

  @Query(() => Message)
  findOneMessage(@Args("id", { type: () => ID }) id: string) {
    return this.messageService.findOne(+id);
  }

  @Mutation(()=>Message)
  updateMessage(
    @Args("id", {type: (()=>ID)}) id: number,
    @Args("updateMessage") updateMessageDto: UpdateMessageDto
  ) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Mutation(()=>Message)
  removeMessage(@Args("id", {type: (()=>ID)}) id: number) {
    return this.messageService.remove(+id);
  }
}
