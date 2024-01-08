import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '@chat-mind-bots/bots-models';
import { ICreateUserPayload } from '@chat-mind-bots/rabbit-patterns';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: ICreateUserPayload) {
    const { telegram, botLogin } = createUserDto;

    let userInDB = false;

    if (telegram?.id) {
      const oldUser: null | UserDocument = await this.userModel
        .findOne({ 'telegram.id': telegram?.id })
        .exec();

      if (oldUser) {
        userInDB = true;

        if (!oldUser?.bots.includes(botLogin)) {
          await oldUser.updateOne({ bots: [...oldUser.bots, botLogin] });
        }
      }
    }
    if (userInDB) {
      return;
    }
    const user = await this.userModel.create({
      telegram: telegram,
      bots: [botLogin],
    });
    return user;
  }
}
