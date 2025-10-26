import { Module } from '@nestjs/common';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { UserModule } from '../user/user.module';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [UserModule, CategoryModule],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
