import { Injectable } from '@nestjs/common';
import { CreateUserDto, User, UserDocument } from '@chat-mind-bots/bots-models';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    let userInDB = false;
    if (createUserDto.telegram?.id) {
      const oldUser = await this.userModel
        .findOne({ 'telegram.id': createUserDto.telegram?.id })
        .exec();
      if (oldUser) {
        userInDB = true;
      }
    }
    if (userInDB) {
      return;
    }
    const user = await this.userModel.create({
      telegram: createUserDto.telegram,
    });
    return user;
  }
}
