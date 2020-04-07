import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Container, Info, Nav, NavItem, Logout } from './styles';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/fastfeet-logo.png';

const activeStyle = {
  color: '#444',
};

export default function Header() {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);

  function logout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Info>
        <img src={logo} alt="Logo FastFeet" />
        <Nav>
          <ul>
            <NavItem>
              <NavLink to="/orders" activeStyle={activeStyle}>
                Entregas
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/deliverymen" activeStyle={activeStyle}>
                Entregadores
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/recipients" activeStyle={activeStyle}>
                Destinatários
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/problems" activeStyle={activeStyle}>
                Problemas
              </NavLink>
            </NavItem>
          </ul>
        </Nav>
      </Info>

      <Logout>
        <strong>{profile.name}</strong>
        <button type="button" onClick={logout}>
          sair do sistema
        </button>
      </Logout>
    </Container>
  );
}
