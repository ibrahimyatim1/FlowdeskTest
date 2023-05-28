  export interface Trade {
    id: number;
    [key: string]: number | string;
  }
  
  export interface CoinInfo {
    symbol: string;
    lastPrice: string;
  }

  export type sortCriteria = 'price' | 'time' | 'qty' | '';

  export type sortCriteriaDirection = 'asc' | 'desc' | '';