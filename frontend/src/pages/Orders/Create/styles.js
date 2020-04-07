import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 20px;

  div {
    display: flex;
    align-items: center;

    button,
    a {
      border: 0;
      border-radius: 4px;
      padding: 11px 21px;

      display: flex;
      align-items: center;

      color: #fff;
      font-size: 14px;
      text-transform: uppercase;

      transition: background 0.2s;

      svg {
        margin-right: 7px;
      }
    }

    a {
      background: #ccc;
      margin-right: 15px;

      &:hover {
        background: ${darken(0.05, '#ccc')};
      }
    }

    button {
      background: #7d40e7;

      &:hover {
        background: ${lighten(0.05, '#7d40e7')};
      }
    }
  }
`;

export const Content = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 30px;

  display: flex;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;

    section {
      display: flex;
      flex-direction: column;
      width: 100%;

      &:first-child {
        margin-right: 20px;
      }
    }
  }

  label {
    font-weight: bold;
    color: #444;
    margin-bottom: 7px;
  }

  input {
    border-radius: 4px;
    border: 1px solid #dddddd;
    padding: 12px 25px;
    margin: 0 0 20px;

    &::placeholder {
      color: #666;
      font-size: 16px;
    }
  }
`;
