import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Account } from '../account/account.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);

    const account = this.accountRepository.create({
      userId: savedUser.id,
      balance: 0,
    });
    await this.accountRepository.save(account);

    const userWithAccount = await this.userRepository.findOne({
      where: { id: savedUser.id },
      relations: ['account'],
    });

    if (!userWithAccount) {
      throw new NotFoundException(`User with ID ${savedUser.id} not found`);
    }

    return userWithAccount;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['account'],
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['account'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.remove(user);
  }
}
