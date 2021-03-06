import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { FiArrowLeft, FiCheck } from 'react-icons/fi';

import Loader from '~/components/Loader';
import AsyncSelect from '~/components/AsyncSelect';

import api from '~/services/api';

import { Header, Content } from './styles';

import { createOrderRequest } from '~/store/modules/admin/actions';

const schema = Yup.object().shape({
  product: Yup.string().required('O nome do produto é obrigatório'),
  recipient_id: Yup.string().required('O destinatário é obrigatório'),
  deliveryman_id: Yup.string().required('O entregador é obrigatório'),
});

export default function CreateOrders() {
  const [recipient, setRecipient] = useState(null);
  const [deliveryman, setDeliveryman] = useState(null);

  const dispatch = useDispatch();
  const loading = useSelector(state => state.admin.loading);

  async function handleSubmit({ product }) {
    dispatch(createOrderRequest(product, deliveryman, recipient));
  }

  async function loadData(inputValue, path) {
    try {
      const response = await api.get(path);

      const data = response.data.map(index => ({
        value: index.id,
        label: index.name,
      }));

      return data.filter(d =>
        d.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    } catch (err) {
      console.tron.error(err);
    }

    return [];
  }

  return (
    <>
      <Loader loading={loading} />
      <Form
        schema={schema}
        initialData={{
          product: '',
        }}
        onSubmit={handleSubmit}
      >
        <Header>
          <h1>Cadastro de encomendas</h1>

          <div>
            <Link to="/orders">
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
          <div>
            <section>
              <label>Destinatário</label>
              <AsyncSelect
                type="text"
                label="Destinatário"
                name="recipient_id"
                defaultOptions
                placeholder="Destinatário"
                loadOptions={inputValue => loadData(inputValue, 'recipients')}
                noOptionsMessage={() => 'Nenhum destinatário encontrado'}
                loadingMessage={() => 'Carregando...'}
                onChange={option => setRecipient(option.value)}
              />
            </section>

            <section>
              <label>Entregador</label>
              <AsyncSelect
                type="text"
                name="deliveryman_id"
                defaultOptions
                placeholder="Entregador"
                loadOptions={inputValue => loadData(inputValue, 'deliverymen')}
                noOptionsMessage={() => 'Nenhum entregador encontrado'}
                loadingMessage={() => 'Carregando...'}
                onChange={option => setDeliveryman(option.value)}
              />
            </section>
          </div>

          <label>Nome</label>
          <Input name="product" placeholder="Nome completo" />
        </Content>
      </Form>
    </>
  );
}
