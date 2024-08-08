export type Data = {
  accounts: {
    main: {
      savings: {
        balance: number;
      };
      budget: {
        balance: number;
      };
      goal: {
        balance: number;
        target: number;
      };
    };
    income: {
      name: string;
      balance: number;
    }[];
    expense: {
      name: string;
      balance: number;
    }[];
  };
  transactions: {
    transfer: {
      source: 'Savings' | 'Budget' | 'Goal';
      amount: number;
      receiver: 'Savings' | 'Budget' | 'Goal';
    }[];
    income: {
      source: string;
      amount: number;
      receiver: 'Savings' | 'Budget' | 'Goal';
    }[];
    expense: {
      source: 'Savings' | 'Budget' | 'Goal';
      amount: number;
      receiver: string;
    }[];
  };
}