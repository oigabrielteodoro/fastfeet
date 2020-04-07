import styled from 'styled-components';
import { lighten, darken } from 'polished';

export const Container = styled.header`
  height: 64px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 19px 30px;
  font-weight: bold;
  border: 1px solid #dddddd;
`;

export const Info = styled.div`
  display: flex;

  img {
    height: 26px;
    width: 135px;
    margin-right: 30px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;

  border-left: 1px solid #dddddd;
  padding-left: 30px;

  ul {
    display: flex;
    align-items: center;
  }
`;

export const NavItem = styled.li`
  text-transform: uppercase;
  margin-right: 15px;

  a {
    font-size: 15px;
    color: ${props => (props.active ? '#444444' : '#999999')};
    transition: color 0.2s;

    &:hover {
      color: ${props =>
        props.active ? lighten(0.1, '#444444') : darken(0.1, '#999999')};
    }
  }
`;

export const Logout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  strong {
    color: #666666;
    font-size: 16px;
  }

  button {
    background: none;
    border: 0;

    font-size: 14px;
    color: #de3b3b;

    &:hover {
      color: ${lighten(0.1, '#de3b3b')};
    }
  }
`;
