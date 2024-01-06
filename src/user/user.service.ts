import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/types';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@app/types/user/schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.create({
      telegram: createUserDto.telegram,
    });
    return user;
  }
}
