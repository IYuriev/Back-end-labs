import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from './account.entity';
import { DepositFundsDto } from './dto/deposit-funds.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('account')
@UseGuards(JwtAuthGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('user/:user_id')
  async getAccount(@Param('user_id') userId: string): Promise<Account> {
    return this.accountService.findByUserId(userId);
  }

  @Get('user/:user_id/balance')
  async getBalance(
    @Param('user_id') userId: string,
  ): Promise<{ balance: number }> {
    return this.accountService.getBalance(userId);
  }

  @Post('user/:user_id/deposit')
  async deposit(
    @Param('user_id') userId: string,
    @Body() depositFundsDto: DepositFundsDto,
  ): Promise<Account> {
    return this.accountService.deposit(userId, depositFundsDto);
  }
}
