import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class UserView {
  @Prop({ required: true })
  id: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  login: string;
}

export const UserViewSchema = SchemaFactory.createForClass(UserView);
export type UserViewDocument = HydratedDocument<UserView>;
