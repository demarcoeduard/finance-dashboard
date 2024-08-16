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
      key?: string;
    }[];
    expense: {
      name: string;
      balance: number;
      key?: string;
    }[];
  };
  transactions: {
    transfer: {
      source: 'Savings' | 'Budget' | 'Goal';
      amount: number;
      receiver: 'Savings' | 'Budget' | 'Goal';
      key?: string;
    }[];
    income: {
      source: string;
      amount: number;
      receiver: 'Savings' | 'Budget' | 'Goal';
      key?: string;
    }[];
    expense: {
      source: 'Savings' | 'Budget' | 'Goal';
      amount: number;
      receiver: string;
      key?: string;
    }[];
  };
  theme?: string;
}