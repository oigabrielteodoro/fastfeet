import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(1turn);
  }
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: rgba(0, 0, 0, 0.3);

  section {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-40%);
    overflow: hidden;
    padding: 35px 80px;
    border-radius: 10px;
    background: #fff;
    text-align: center;
    box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15);
    transition: all 0.15s ease;

    svg {
      display: inline-block;
      animation: ${rotate} 2s linear infinite;
    }
  }
`;
