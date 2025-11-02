import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get('users')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('user/:user_id')
  async findOne(@Param('user_id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Delete('user/:user_id')
  async remove(@Param('user_id') id: string): Promise<{ message: string }> {
    await this.userService.remove(id);
    return { message: `User with ID ${id} has been deleted` };
  }
}
