import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { FiArrowLeft, FiCheck } from 'react-icons/fi';

import AvatarInput from './AvatarInput';
import Loader from '~/components/Loader';

import { Header, Content } from './styles';

import { createDeliverymenRequest } from '~/store/modules/admin/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  avatar_id: Yup.string().required('O avatar é obrigatório'),
});

export default function CreateDeliverymen() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.admin.loading);

  async function handleSubmit({ name, email, avatar_id }) {
    dispatch(createDeliverymenRequest(name, email, avatar_id));
  }

  return (
    <>
      <Loader loading={loading} />
      <Form schema={schema} initialData={{}} onSubmit={handleSubmit}>
        <Header>
          <h1>Cadastro de entregadores</h1>

          <div>
            <Link to="/deliverymen">
              <FiArrowLeft size={16} color="#fff" />
              Voltar
            </Link>
            <button type="submit">
              <FiCheck size={16} color="#fff" />
              Salvar
            </button>
          </div>
        </Header>
        <Content>
          <AvatarInput name="avatar_id" />

          <label>Nome</label>
          <Input name="name" placeholder="Nome completo" />

          <label>E-mail</label>
          <Input name="email" type="email" placeholder="example@fastfeet.com" />
        </Content>
      </Form>
    </>
  );
}
