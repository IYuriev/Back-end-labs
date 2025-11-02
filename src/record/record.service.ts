import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from './record.entity';
import { CreateRecordDto } from './dto/create-record.dto';
import { UserService } from '../user/user.service';
import { CategoryService } from '../category/category.service';
import { Account } from '../account/account.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  async create(createRecordDto: CreateRecordDto): Promise<Record> {
    await this.userService.findOne(createRecordDto.userId);

    await this.categoryService.findOne(createRecordDto.categoryId);

    const account = await this.accountRepository.findOne({
      where: { userId: createRecordDto.userId },
    });

    if (!account) {
      throw new NotFoundException(
        `Account not found for user ${createRecordDto.userId}`,
      );
    }

    account.balance = Number(account.balance) - createRecordDto.amount;
    await this.accountRepository.save(account);

    const record = this.recordRepository.create(createRecordDto);
    return this.recordRepository.save(record);
  }

  async findAll(userId?: string, categoryId?: string): Promise<Record[]> {
    if (!userId && !categoryId) {
      throw new BadRequestException(
        'At least one of user_id or category_id must be provided',
      );
    }

    const query = this.recordRepository.createQueryBuilder('record');

    if (userId) {
      query.andWhere('record.user_id = :userId', { userId });
    }

    if (categoryId) {
      query.andWhere('record.category_id = :categoryId', { categoryId });
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<Record> {
    const record = await this.recordRepository.findOne({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }

    return record;
  }

  async remove(id: string): Promise<void> {
    const record = await this.recordRepository.findOne({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Record with ID ${id} not found`);
    }

    const account = await this.accountRepository.findOne({
      where: { userId: record.userId },
    });

    if (account) {
      account.balance = Number(account.balance) + Number(record.amount);
      await this.accountRepository.save(account);
    }

    await this.recordRepository.remove(record);
  }
}
