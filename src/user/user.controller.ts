import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import {
  CREATE_USER,
  ICreateUserPayload,
} from '@chat-mind-bots/rabbit-patterns';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(CREATE_USER)
  create(@Payload() createUserDto: ICreateUserPayload) {
    return this.userService.create(createUserDto);
  }
}
