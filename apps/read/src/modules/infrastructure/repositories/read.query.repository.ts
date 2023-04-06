import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserView, UserViewDocument } from '../../../domain/user-view.schema';

@Injectable()
export class ReadQueryRepository {
  constructor(
    @InjectModel(UserView.name)
    private readonly UserView: Model<UserViewDocument>
  ) {}

  async getMe(userId: string): Promise<UserViewDocument | null> {
    return this.UserView.findOne({ userId });
  }
}
