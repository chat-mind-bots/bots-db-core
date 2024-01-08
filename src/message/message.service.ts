import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from '@chat-mind-bots/bots-models';
import { INewMessagePayload } from '@chat-mind-bots/rabbit-patterns';
import { Model } from 'mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>,
  ) {}
  async create(createMessageDto: INewMessagePayload) {
    const message = await this.messageModel.create({ ...createMessageDto });
    return message;
  }
}
