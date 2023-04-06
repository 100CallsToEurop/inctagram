import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://qTheSky:02121998@cluster0.ia7e6qm.mongodb.net/Instagram?retryWrites=true&w=majority'
    ),
  ],
  providers: [],
  exports: [_MongooseModule],
})
export class _MongooseModule {}
