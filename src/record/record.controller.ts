import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './record.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('record')
@UseGuards(JwtAuthGuard)
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  async create(@Body() createRecordDto: CreateRecordDto): Promise<Record> {
    return this.recordService.create(createRecordDto);
  }

  @Get()
  async findAll(
    @Query('user_id') userId?: string,
    @Query('category_id') categoryId?: string,
  ): Promise<Record[]> {
    return this.recordService.findAll(userId, categoryId);
  }

  @Get(':record_id')
  async findOne(@Param('record_id') id: string): Promise<Record> {
    return this.recordService.findOne(id);
  }

  @Delete(':record_id')
  async remove(@Param('record_id') id: string): Promise<{ message: string }> {
    await this.recordService.remove(id);
    return { message: `Record with ID ${id} has been deleted` };
  }
}
