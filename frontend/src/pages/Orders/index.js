import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  FiSearch,
  FiPlus,
  FiMoreHorizontal,
  FiEye,
  FiEdit,
  FiTrash2,
  FiArrowRight,
} from 'react-icons/fi';

import ShimmerEffect from '~/components/Shimmer';

import { Actions, Table, TableItem, Badge, ActionList, Modal } from './styles';

import api from '~/services/api';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);

        const response = await api.get('orders', {
          params: {
            name: inputSearch,
          },
        });

        const data = response.data.map(order => ({
          ...order,
          dates: {
            start: order.start_date
              ? format(parseISO(order.start_date), 'dd/MM/yyyy', {
                  locale: pt,
                })
              : null,
            end: order.end_date
              ? format(parseISO(order.end_date), 'dd/MM/yyyy', {
                  locale: pt,
                })
              : null,
          },
          visible: false,
          visualize: false,
          status: order.end_date
            ? 'Entregue'
            : order.canceled_at
            ? 'Cancelado'
            : order.start_date
            ? 'Retirada'
            : 'Pendente',
        }));

        setOrders(data);
        setLoading(false);
      } catch (err) {
        toast.error('Ocorreu um erro interno.');
      }
    }

    loadOrders();
  }, [inputSearch]);

  function handleToggle(id, visible, visualize) {
    setOrders(
      orders.map(order =>
        order.id === id ? { ...order, visible, visualize } : order
      )
    );
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/orders/${id}`);

      setOrders(orders.filter(order => order.id !== id));

      toast.success('Encomenda excluida com sucesso.');
    } catch (err) {
      toast.error('Ocorreu um erro interno.');
    }
  }

  return (
    <>
      <h1>Gerenciando encomendas</h1>

      <Actions>
        <div>
          <button type="submit">
            <FiSearch color="#999999" size={16} />
          </button>
          <Input
            name="search"
            placeholder="Buscar por encomendas"
            onChange={event => setInputSearch(event.target.value)}
            value={inputSearch}
          />
        </div>

        <Link to="/orders/create">
          <FiPlus color="#fff" size={20} />
          Cadastrar
        </Link>
      </Actions>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <>
              <TableItem key={order.id} status={order.status}>
                <td>
                  {loading ? (
                    <ShimmerEffect width={30} height={16} />
                  ) : (
                    <>#{order.id}</>
                  )}
                </td>
                <td>
                  {loading ? (
                    <ShimmerEffect width={128} height={16} />
                  ) : (
                    order.recipient.name
                  )}
                </td>
                <td>
                  <div>
                    {loading ? (
                      <ShimmerEffect type="image" />
                    ) : (
                      <img
                        src={
                          order.deliveryman.avatar.url ||
                          'https://api.adorable.io/avatars/35/abott@adorable.png'
                        }
                        alt="Avatar"
                      />
                    )}

                    {loading ? (
                      <ShimmerEffect width={50} height={16} />
                    ) : (
                      order.deliveryman.name
                    )}
                  </div>
                </td>
                <td>
                  {loading ? (
                    <ShimmerEffect width={100} height={16} />
                  ) : (
                    order.recipient.city
                  )}
                </td>
                <td>
                  {loading ? (
                    <ShimmerEffect width={50} height={16} />
                  ) : (
                    order.recipient.uf
                  )}
                </td>
                <td>
                  {loading ? (
                    <ShimmerEffect width={80} height={16} />
                  ) : (
                    <div>
                      <span>
                        <div />
                        {order.status}
                      </span>
                    </div>
                  )}
                </td>
                <td>
                  <Badge
                    onClick={() =>
                      handleToggle(order.id, !order.visible, order.visualize)
                    }
                  >
                    <FiMoreHorizontal color="#C6C6C6" size={16} />
                  </Badge>

                  <ActionList visible={order.visible}>
                    <button
                      type="button"
                      onClick={() =>
                        handleToggle(order.id, !order.visible, !order.visualize)
                      }
                    >
                      <FiEye color="#8E5BE8" size={16} />
                      Visualizar
                    </button>

                    <Link to="/edit">
                      <FiEdit color="#4D85EE" size={16} />
                      Editar
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(order.id)}
                    >
                      <FiTrash2 color="#DE3B3B" size={16} />
                      Excluir
                    </button>
                  </ActionList>
                </td>
              </TableItem>
              <Modal key={order.id} visible={order.visualize}>
                <div>
                  <header>
                    <strong>Informações da encomenda</strong>
                    <button
                      type="button"
                      onClick={() =>
                        handleToggle(order.id, order.visible, !order.visualize)
                      }
                    >
                      <FiArrowRight color="#ddd" size={20} />
                    </button>
                  </header>

                  <span>{order.recipient.street}</span>
                  <span>
                    {order.recipient.city} - {order.recipient.uf}
                  </span>
                  <span>{order.recipient.zipcode}</span>
                  <hr />
                  <strong>Datas</strong>
                  <strong>
                    Retirada:{' '}
                    <span>{order.dates.start && order.dates.start}</span>
                  </strong>
                  <strong>
                    Entrega: <span>{order.dates.end && order.dates.end}</span>
                  </strong>
                  {order.signature && (
                    <>
                      <hr />
                      <strong>Assinatura do destinatário</strong>
                      {order.signature && (
                        <img
                          src={order.signature.url}
                          alt="Delivery Signature"
                        />
                      )}
                    </>
                  )}
                </div>
              </Modal>
            </>
          ))}
        </tbody>
      </Table>
    </>
  );
}
