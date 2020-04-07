import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 30px;
  box-shadow: 0 0 10px #00000033;

  img {
    margin: 30px auto 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  form {
    display: flex;
    flex-direction: column;

    strong {
      text-transform: uppercase;
      color: #444444;
      font-size: 14px;
      margin-bottom: 5px;
    }

    input {
      border-radius: 4px;
      border: 1px solid #dddddd;
      padding: 12px 25px;
      margin: 0 0 20px;

      &::placeholder {
        color: #999999;
        font-size: 16px;
      }
    }

    button {
      background: #7d40e7;
      color: #fff;
      border: 0;
      border-radius: 4px;
      height: 45px;
      font-weight: bold;
      transition: background 0.2s;

      &:hover {
        background: ${lighten(0.05, '#7d40e7')};
      }
    }
  }
`;
