import styled from 'styled-components';
import { lighten } from 'polished';

export const Actions = styled.div`
  margin-top: 35px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;

    button {
      position: absolute;
      border: 0;
      background: none;
      z-index: 1;
      margin-left: 10px;
    }

    input {
      position: relative;
      border-radius: 4px;
      border: 1px solid #dddddd;
      padding: 9px 36px;

      &::placeholder {
        color: #999999;
        font-size: 14px;
      }
    }
  }

  > button,
  a {
    background: #7d40e7;

    border: 0;
    border-radius: 4px;
    padding: 11px 21px;

    display: flex;
    align-items: center;

    color: #fff;
    font-size: 14px;
    text-transform: uppercase;

    transition: background 0.2s;

    &:hover {
      background: ${lighten(0.05, '#7d40e7')};
    }

    svg {
      margin-right: 7px;
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: separate;
  border-spacing: 0px 10px;
  border-style: hidden;

  display: table;

  th {
    text-align: left;
    padding: 0 20px 10px 25px;
    color: #444444;
    font-weight: bold;
    width: 1200px;

    &:last-child {
      text-align: right;
    }
  }
`;

export const TableItem = styled.tr`
  td {
    background: #fff;
    color: #666666;
    font-size: 16px;
    border-radius: 4px;
    width: 1200px;
    text-align: left;
    padding: 20px 20px 16px 25px;

    img {
      height: 35px;
      width: 35px;
      border-radius: 50%;
    }

    &:last-child {
      text-align: right;
    }
  }
`;

export const Badge = styled.button`
  background: none;
  border: 0;
  position: relative;
`;

export const ActionList = styled.ul`
  position: absolute;
  width: 150px;
  left: calc(90% - 66px);
  box-shadow: 0px 0px 2px #00000026;
  z-index: 2;

  background: #fff;
  border-radius: 4px;
  padding: 15px 10px;
  display: ${props => (props.visible ? 'block' : 'none')};

  button {
    border: 0;
    width: 100%;
  }

  a,
  button {
    display: flex;
    align-items: center;
    text-align: left;
    color: #999999;

    font-size: 16px;
    padding-bottom: 6px;
    margin-top: 6px;

    background: none;
    border-bottom: 1px solid #eeeeee;

    svg {
      margin-right: 5px;
    }

    &:last-child {
      border-bottom: 0;
      margin-bottom: 0;
    }
  }
`;

export const Error = styled.h1`
  text-align: center;
`;
