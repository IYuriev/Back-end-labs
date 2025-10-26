import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  create(@Body() createUserDto: CreateUserDto): User {
    return this.userService.create(createUserDto);
  }

  @Get('users')
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Get('user/:user_id')
  findOne(@Param('user_id') id: string): User {
    return this.userService.findOne(id);
  }

  @Delete('user/:user_id')
  remove(@Param('user_id') id: string): { message: string } {
    this.userService.remove(id);
    return { message: `User with ID ${id} has been deleted` };
  }
}
