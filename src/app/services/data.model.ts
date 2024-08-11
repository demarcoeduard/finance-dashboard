export type Data = {
  accounts: {
    main: [
      {
        name: string;
        balance: number;
      },
      {
        name: string;
        balance: number;
      },
      {
        name: string;
        balance: number;
        target: number;
      }
    ];
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