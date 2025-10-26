export class Record {
  id: string;
  userId: string;
  categoryId: string;
  createdAt: Date;
  amount: number;

  constructor(
    id: string,
    userId: string,
    categoryId: string,
    createdAt: Date,
    amount: number,
  ) {
    this.id = id;
    this.userId = userId;
    this.categoryId = categoryId;
    this.createdAt = createdAt;
    this.amount = amount;
  }
}
