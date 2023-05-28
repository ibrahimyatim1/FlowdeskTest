import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Title = styled.h2`
  margin-top: 25px;
`;

const Text = styled.label`
  font-size: 16px;
`;

const Button = styled.button`
  font-weight: bold;
  margin-left: 3px;
`;

const Select = styled.select`
  padding: 5px;
  margin-left: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Content = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const HeaderColumn = styled.th`
  background-color: #f0f0f0;
  padding: 10px;
`;

const Row = styled.tr`
  &:nth-child(even) {
    background-color: #f8f8f8;
  }
`;

const Column = styled.td`
  padding: 10px;
`;

export {
  Container,
  Form,
  Label,
  Table,
  Select,
  HeaderColumn,
  Row,
  Column,
  Content,
  Button,
  Title,
  Text
};