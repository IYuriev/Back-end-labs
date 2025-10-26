import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Record } from './record.entity';
import { CreateRecordDto } from './dto/create-record.dto';
import { UserService } from '../user/user.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class RecordService {
  private records: Map<string, Record> = new Map();
  private currentId = 1;

  constructor(
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  create(createRecordDto: CreateRecordDto): Record {
    this.userService.findOne(createRecordDto.userId);

    this.categoryService.findOne(createRecordDto.categoryId);

    const id = (this.currentId++).toString();
    const record = new Record(
      id,
      createRecordDto.userId,
      createRecordDto.categoryId,
      new Date(),
      createRecordDto.amount,
    );
    this.records.set(id, record);
    return record;
  }

  findAll(userId?: string, categoryId?: string): Record[] {
    if (!userId && !categoryId) {
      throw new BadRequestException(
        'At least one of user_id or category_id must be provided',
      );
    }

    let records = Array.from(this.records.values());

    if (userId) {
      records = records.filter((record) => record.userId === userId);
    }

    if (categoryId) {
      records = records.filter((record) => record.categoryId === categoryId);
    }

    return records;
  }

  findOne(id: string): Record {
    const record = this.records.get(id);
    if (!record) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }
    return record;
  }

  remove(id: string): void {
    const record = this.records.get(id);
    if (!record) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }
    this.records.delete(id);
  }
}
