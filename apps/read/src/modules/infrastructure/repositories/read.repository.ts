import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserView, UserViewDocument } from '../../../domain/user-view.schema';

@Injectable()
export class ReadRepository {
  constructor(
    @InjectModel(UserView.name)
    private readonly UserView: Model<UserViewDocument>
  ) {}

  async createUserMe(id: string, email: string, login: string) {
    await this.UserView.create({ id, email, login });
  }
}
