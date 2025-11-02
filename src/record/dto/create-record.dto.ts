import { IsUUID, IsNumber, IsPositive, Min } from 'class-validator';

export class CreateRecordDto {
  @IsUUID('4', { message: 'User ID must be a valid UUID' })
  userId: string;

  @IsUUID('4', { message: 'Category ID must be a valid UUID' })
  categoryId: string;

  @IsNumber({}, { message: 'Amount must be a number' })
  @IsPositive({ message: 'Amount must be a positive number' })
  @Min(0.01, { message: 'Amount must be at least 0.01' })
  amount: number;
}
