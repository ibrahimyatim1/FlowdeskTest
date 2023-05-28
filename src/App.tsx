import React, { useState, useEffect, ChangeEvent } from 'react';
import {  Container, Label, Table, Select, HeaderColumn, Row, Column, Content, Button, Title, Text } from './style.js';
import { Trade, CoinInfo, sortCriteria, sortCriteriaDirection } from './types.js';
import {fetchPairs, fetchTrades, fetchCoinInfo} from './api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [pairs, setPairs] = useState<string[]>([]);
  const [selectedPair, setSelectedPair] = useState<string>('');
  const [trades, setTrades] = useState<Trade[]>([]);
  const [coinInfo, setCoinInfo] = useState<CoinInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortCriteria, setSortCriteria] = useState<sortCriteria>('');
  const [sortCriteriaDirection, setSortCriteriaDirection] = useState<sortCriteriaDirection>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPairs(await fetchPairs());
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handlePairChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    await setSelectedPair(event.target.value);
    // console.log('selected:', selectedPair);
  };

  useEffect(() => {
    const _trades = [...trades];
    if(sortCriteriaDirection == 'asc')
    _trades.sort((a, b) => (a[sortCriteria] as number) - (b[sortCriteria] as number));
    else _trades.sort((a, b) => (b[sortCriteria] as number) - (a[sortCriteria] as number));
    setTrades(_trades);
  }, [sortCriteria, sortCriteriaDirection]);

  useEffect(() => {
    async function changePairs(){
      if(selectedPair === '') return;
      setIsLoading(true);
      setCoinInfo(await fetchCoinInfo(selectedPair));
      setTrades(await fetchTrades(selectedPair));
      setIsLoading(false);
    }
    changePairs();
  }, [selectedPair]);

  function setSortingValues(sortType : sortCriteria){
    if(sortType === sortCriteria){
      if(sortCriteriaDirection==='desc' || ''){
        setSortCriteriaDirection('asc');
      }
      else {
        setSortCriteriaDirection('desc');
      }
    }
    else {
      setSortCriteria(sortType);
      setSortCriteriaDirection('desc');
    }
  }

  return (
    <Container>
      <div>
        <Label>Select you crypto pair:</Label>
        <Select value={selectedPair} onChange={handlePairChange}>
          <option value="">-- Select a pair --</option>
          {pairs.map((pair) => (
            <option key={pair} value={pair}>
              {pair}
            </option>
          ))}
        </Select>
      </div>
      { !isLoading && coinInfo && (
      <>
        <Content>
          <Title>Coin information</Title>
          <Text>Symbol: {coinInfo.symbol}</Text><br/>
          <Text>Current Price: {coinInfo.lastPrice}</Text><br/>
          <Title>Recent Trades</Title>
          <Button onClick={() => setSortingValues('time')}>Sort by Time {sortCriteria === 'time' && <FontAwesomeIcon icon={ sortCriteriaDirection === 'asc' ? faArrowUp :  faArrowDown }/>}</Button>
          <Button onClick={() => setSortingValues('price')}>Sort by Price {sortCriteria === 'price' && <FontAwesomeIcon icon={ sortCriteriaDirection === 'asc' ? faArrowUp :  faArrowDown }/>}</Button>
          <Button onClick={() => setSortingValues('qty')}>Sort by Quantity {sortCriteria === 'qty' && <FontAwesomeIcon icon={ sortCriteriaDirection === 'asc' ? faArrowUp :  faArrowDown }/>}</Button>
          <Table>
            <thead>
              <tr>
                <HeaderColumn>Time</HeaderColumn>
                <HeaderColumn>Price</HeaderColumn>
                <HeaderColumn>Quantity</HeaderColumn>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade) => (
                <Row key={trade.id}>
                  <Column>{new Date(trade.time).toLocaleString()}</Column>
                  <Column>{trade.price}</Column>
                  <Column>{trade.qty}</Column>
                </Row>
              ))}
            </tbody>
          </Table>
        </Content>
      </>
    )}
    </Container>
  );
}

export default App;
