import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessageService } from './message.service';
import {
  INewMessagePayload,
  NEW_MESSAGE,
} from '@chat-mind-bots/rabbit-patterns';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @MessagePattern(NEW_MESSAGE)
  create(@Payload() createMessageDto: INewMessagePayload) {
    return this.messageService.create(createMessageDto);
  }
}
