export interface ExpenseByCategory {
  categoryName: string;
  expense: number;
}

export interface AccountBalance {
  accountName: string;
  balance: number;
}

export interface UserStatusResponse {
  monthIncome: number;
  monthExpense: number;
  monthBalance: number;
  totalBalance: number;
  expensesByCategory: ExpenseByCategory[];
  balancesByAccount: AccountBalance[];
}
