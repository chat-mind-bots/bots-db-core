import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now, Schema as MongooseSchema } from 'mongoose';
import tt from 'typegram';
@Schema()
export class User {
  @Prop({ type: MongooseSchema.Types.Mixed, required: false })
  telegram?: tt.User;

  @Prop({ type: Date, default: now() })
  createdAt: Date;

  @Prop({ type: Date, default: now() })
  updatedAt: Date;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
