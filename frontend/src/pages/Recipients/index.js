import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import {
  FiSearch,
  FiPlus,
  FiMoreHorizontal,
  FiEdit,
  FiTrash2,
} from 'react-icons/fi';

import { Actions, Table, TableItem, Badge, ActionList } from './styles';

import api from '~/services/api';

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [inputSearch, setInputSearch] = useState('');

  useEffect(() => {
    async function loadRecipients() {
      try {
        const response = await api.get('recipients', {
          params: {
            name: inputSearch,
          },
        });

        const data = response.data.map(recipient => ({
          ...recipient,
          visible: false,
        }));

        setRecipients(data);
      } catch (err) {
        toast.error('Ocorreu um erro interno.');
      }
    }

    loadRecipients();
  }, [inputSearch]);

  function handleToggle(id, visible) {
    setRecipients(
      recipients.map(recipient =>
        recipient.id === id ? { ...recipient, visible } : recipient
      )
    );
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/recipients/${id}`);

      setRecipients(recipients.filter(recipient => recipient.id !== id));
    } catch (err) {
      toast.error('Ocorreu um erro interno.');
    }
  }

  return (
    <>
      <h1>Gerenciando destinatários</h1>

      <Actions>
        <div>
          <button type="submit">
            <FiSearch color="#999999" size={16} />
          </button>
          <Input
            name="search"
            placeholder="Buscar por distinatários"
            onChange={event => setInputSearch(event.target.value)}
            value={inputSearch}
          />
        </div>

        <Link to="/recipients/create">
          <FiPlus color="#fff" size={20} />
          Cadastrar
        </Link>
      </Actions>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {recipients.map(recipient => (
            <>
              <TableItem key={recipient.id}>
                <td>#{recipient.id}</td>
                <td>{recipient.name}</td>
                <td>
                  {recipient.street}, {recipient.number}, {recipient.city} -{' '}
                  {recipient.uf}
                </td>
                <td>
                  <Badge
                    onClick={() =>
                      handleToggle(recipient.id, !recipient.visible)
                    }
                  >
                    <FiMoreHorizontal color="#C6C6C6" size={16} />
                  </Badge>

                  <ActionList visible={recipient.visible}>
                    <Link
                      to={{
                        pathname: '/recipients/edit',
                        state: {
                          id: recipient.id,
                          name: recipient.name,
                          street: recipient.street,
                          city: recipient.city,
                          uf: recipient.uf,
                          number: recipient.number,
                          zipcode: recipient.zipcode,
                          complement: recipient.complement,
                        },
                      }}
                    >
                      <FiEdit color="#4D85EE" size={16} />
                      Editar
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(recipient.id)}
                    >
                      <FiTrash2 color="#DE3B3B" size={16} />
                      Excluir
                    </button>
                  </ActionList>
                </td>
              </TableItem>
            </>
          ))}
        </tbody>
      </Table>
    </>
  );
}
