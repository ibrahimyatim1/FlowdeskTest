import axios from 'axios';
import { exchangeLink, coinData } from './serverLink';

export const fetchPairs = async () => {
    try {
      const response = await axios.get(exchangeLink);
      const symbols = response.data.symbols.map((symbol) => symbol.symbol);
      return symbols;
    } catch (error) {
      console.error('Failed to fetch pairs:', error);
    }
  };

  export const fetchCoinInfo = async (selectedPair) => {
    try {
      const response = await axios.get(`${coinData}${selectedPair}`);
      console.log('new', response.data);
        return response.data;
    } catch (error) {
      console.error('Failed to fetch coin informaiton:', error);
    }
  };

  export const fetchTrades = async (selectedPair) => {
    try {
      const response = await axios.get(`https://api.binance.com/api/v3/trades?symbol=${selectedPair}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch trades:', error);
    }
  };