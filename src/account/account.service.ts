import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { DepositFundsDto } from './dto/deposit-funds.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async findByUserId(userId: string): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { userId },
      relations: ['user'],
    });

    if (!account) {
      throw new NotFoundException(`Account not found for user ${userId}`);
    }

    return account;
  }

  async deposit(
    userId: string,
    depositFundsDto: DepositFundsDto,
  ): Promise<Account> {
    const account = await this.findByUserId(userId);

    account.balance = Number(account.balance) + depositFundsDto.amount;
    return this.accountRepository.save(account);
  }

  async getBalance(userId: string): Promise<{ balance: number }> {
    const account = await this.findByUserId(userId);
    return { balance: Number(account.balance) };
  }
}
