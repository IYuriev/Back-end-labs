import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  private categories: Map<string, Category> = new Map();
  private currentId = 1;

  create(createCategoryDto: CreateCategoryDto): Category {
    const id = (this.currentId++).toString();
    const category = new Category(id, createCategoryDto.name);
    this.categories.set(id, category);
    return category;
  }

  findAll(): Category[] {
    return Array.from(this.categories.values());
  }

  findOne(id: string): Category {
    const category = this.categories.get(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  remove(id: string): void {
    const category = this.categories.get(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    this.categories.delete(id);
  }
}
