import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Category {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(): Category[] {
    return this.categoryService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string): { message: string } {
    this.categoryService.remove(id);
    return { message: `Category with ID ${id} has been deleted` };
  }
}
