import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './record.entity';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  create(@Body() createRecordDto: CreateRecordDto): Record {
    return this.recordService.create(createRecordDto);
  }

  @Get()
  findAll(
    @Query('user_id') userId?: string,
    @Query('category_id') categoryId?: string,
  ): Record[] {
    return this.recordService.findAll(userId, categoryId);
  }

  @Get(':record_id')
  findOne(@Param('record_id') id: string): Record {
    return this.recordService.findOne(id);
  }

  @Delete(':record_id')
  remove(@Param('record_id') id: string): { message: string } {
    this.recordService.remove(id);
    return { message: `Record with ID ${id} has been deleted` };
  }
}
