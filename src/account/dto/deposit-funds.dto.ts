import { IsNumber, IsPositive, Min } from 'class-validator';

export class DepositFundsDto {
  @IsNumber({}, { message: 'Amount must be a number' })
  @IsPositive({ message: 'Amount must be a positive number' })
  @Min(0.01, { message: 'Amount must be at least 0.01' })
  amount: number;
}
