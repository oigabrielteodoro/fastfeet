import styled from 'styled-components';

export const Container = styled.section`
  align-self: center;
  margin-bottom: 30px;

  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    border: 1px dashed #ddd;

    width: 150px;
    height: 150px;

    border-radius: 50%;

    &:hover {
      opacity: 0.7;
    }

    span {
      color: #ddd;
      font-weight: bold;
      font-size: 18px;
    }

    img {
      height: 150px;
      width: 150px;
      border-radius: 50%;
      border: 3px solid #7d40e7;
      background: #eee;
    }

    input {
      display: none;
    }
  }
`;
