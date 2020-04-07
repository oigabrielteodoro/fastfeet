import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { FiArrowLeft, FiCheck } from 'react-icons/fi';

import InputMask from './InputMask';
import Loader from '~/components/Loader';

import { Header, Content, InputGroup } from './styles';

import { createRecipientRequest } from '~/store/modules/admin/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  street: Yup.string().required('A rua é obrigatória'),
  number: Yup.number().required('O número é obrigatório'),
  complement: Yup.string(),
  city: Yup.string().required('A cidade é obrigatória'),
  uf: Yup.string()
    .length(2, 'O UF precisa possuir 2 digitos')
    .required('O UF é obrigatório'),
});

export default function CreateRecipients() {
  const [zipcode, setZipcode] = useState('');

  const dispatch = useDispatch();
  const loading = useSelector(state => state.admin.loading);

  async function handleSubmit(data) {
    dispatch(
      createRecipientRequest({ ...data, zipcode: zipcode.replace('-', '') })
    );
  }

  const initialData = {
    name: '',
    street: '',
    complement: '',
    city: '',
    uf: '',
    zipcode: '',
  };

  return (
    <>
      <Loader loading={loading} />
      <Form schema={schema} initialData={initialData} onSubmit={handleSubmit}>
        <Header>
          <h1>Cadastro de destinatários</h1>

          <div>
            <Link to="/recipients">
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
          <label>
            Nome
            <Input name="name" placeholder="Ludwig van Beethoven" />
          </label>

          <InputGroup>
            <label>
              Rua
              <Input
                name="street"
                placeholder="Rua Beethoven"
                style={{ width: 610 }}
              />
            </label>

            <label>
              Número
              <Input
                name="number"
                type="number"
                placeholder="1729"
                style={{ width: 150 }}
              />
            </label>

            <label>
              Complemento
              <Input
                name="complement"
                placeholder="Casa"
                style={{ width: 140 }}
              />
            </label>
          </InputGroup>

          <InputGroup>
            <label>
              Cidade
              <Input name="city" placeholder="Diadema" style={{ width: 440 }} />
            </label>

            <label>
              CEP
              <InputMask
                name="zipcode"
                mask="99999-999"
                maskPlaceholder="9999-9999"
                placeholder="09960-580"
                style={{ width: 380 }}
                onChange={event => setZipcode(event.target.value)}
                value={zipcode}
              />
            </label>

            <label>
              UF
              <Input name="uf" placeholder="SP" style={{ width: 80 }} />
            </label>
          </InputGroup>
        </Content>
      </Form>
    </>
  );
}
