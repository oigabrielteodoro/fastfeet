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

import ShimmerEffect from '~/components/Shimmer';

import { Actions, Table, TableItem, Badge, ActionList } from './styles';

import api from '~/services/api';

export default function Deliverymen() {
  const [deliverymen, setDeliverymen] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadDeliverymen() {
      try {
        setLoading(true);

        const response = await api.get('deliverymen', {
          params: {
            name: inputSearch,
          },
        });

        const data = response.data.map(deliveryman => ({
          ...deliveryman,
          visible: false,
        }));

        setDeliverymen(data);
        setLoading(false);
      } catch (err) {
        toast.error('Ocorreu um erro interno.');
      }
    }

    loadDeliverymen();
  }, [inputSearch]);

  function handleToggle(id, visible) {
    setDeliverymen(
      deliverymen.map(deliveryman =>
        deliveryman.id === id ? { ...deliveryman, visible } : deliveryman
      )
    );
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/deliverymen/${id}`);

      setDeliverymen(deliverymen.filter(deliveryman => deliveryman.id !== id));
    } catch (err) {
      toast.error('Ocorreu um erro interno.');
    }
  }

  return (
    <>
      <h1>Gerenciando entregadores</h1>

      <Actions>
        <div>
          <button type="submit">
            <FiSearch color="#999999" size={16} />
          </button>
          <Input
            name="search"
            placeholder="Buscar por entregadores"
            onChange={event => setInputSearch(event.target.value)}
            value={inputSearch}
          />
        </div>

        <Link to="/deliverymen/create">
          <FiPlus color="#fff" size={20} />
          Cadastrar
        </Link>
      </Actions>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {deliverymen.map(deliveryman => (
            <>
              <TableItem key={deliveryman.id}>
                <td>#{deliveryman.id}</td>
                <td>
                  {loading ? (
                    <ShimmerEffect type="image" />
                  ) : (
                    <img
                      src={
                        deliveryman.avatar.url ||
                        'https://api.adorable.io/avatars/35/abott@adorable.png'
                      }
                      alt="Avatar"
                    />
                  )}
                </td>
                <td>
                  {loading ? (
                    <ShimmerEffect width={50} height={16} />
                  ) : (
                    deliveryman.name
                  )}
                </td>
                <td>
                  {loading ? (
                    <ShimmerEffect width={150} height={16} />
                  ) : (
                    deliveryman.email
                  )}
                </td>
                <td>
                  <Badge
                    onClick={() =>
                      handleToggle(deliveryman.id, !deliveryman.visible)
                    }
                  >
                    <FiMoreHorizontal color="#C6C6C6" size={16} />
                  </Badge>

                  <ActionList visible={deliveryman.visible}>
                    <Link
                      to={{
                        pathname: '/deliverymen/edit',
                        state: {
                          id: deliveryman.id,
                          name: deliveryman.name,
                          email: deliveryman.email,
                          avatar: deliveryman.avatar,
                        },
                      }}
                    >
                      <FiEdit color="#4D85EE" size={16} />
                      Editar
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(deliveryman.id)}
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
