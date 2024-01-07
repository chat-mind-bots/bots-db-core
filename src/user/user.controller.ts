import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CREATE_USER } from '@chat-mind-bots/rabbit-patterns';
import { CreateUserDto } from '@chat-mind-bots/bots-models';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(CREATE_USER)
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
