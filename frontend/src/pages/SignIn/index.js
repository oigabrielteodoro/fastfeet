import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/fastfeet-logo.png';

import { signInRequest } from '~/store/modules/auth/actions';

import { Container } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <img src={logo} alt="" />

      <Form onSubmit={handleSubmit}>
        <strong>Seu e-mail</strong>
        <Input name="email" type="email" placeholder="exemplo@email.com" />

        <strong>Sua senha</strong>
        <Input name="password" type="password" placeholder="Senha secreta" />

        <button type="submit">Entrar no sistema</button>
      </Form>
    </Container>
  );
}
