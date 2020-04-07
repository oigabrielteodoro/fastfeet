import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { FiArrowLeft, FiCheck } from 'react-icons/fi';

import Loader from '~/components/Loader';
import AvatarInput from '~/components/AvatarInput';

import { Header, Content } from '../Create/styles';

import { updateDeliverymenRequest } from '~/store/modules/admin/actions';

const schema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email('Insira um e-mail válido'),
  avatar_id: Yup.string(),
});

export default function EditDeliverymen() {
  const location = useLocation();

  const dispatch = useDispatch();
  const loading = useSelector(state => state.admin.loading);

  const initialData = {
    name: location.state.name,
    email: location.state.email,
    avatar_id: location.state.avatar,
  };

  async function handleSubmit({ name, email, avatar_id }) {
    const { id } = location.state;

    dispatch(updateDeliverymenRequest(id, name, email, avatar_id));
  }

  return (
    <>
      <Loader loading={loading} />
      <Form schema={schema} initialData={initialData} onSubmit={handleSubmit}>
        <Header>
          <h1>Edição de entregadores</h1>

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
