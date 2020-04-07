import React, { useState, useEffect } from 'react';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import {
  FiSearch,
  FiMoreHorizontal,
  FiEye,
  FiTrash2,
  FiArrowRight,
} from 'react-icons/fi';

import { Actions, Table, TableItem, Badge, ActionList, Modal } from './styles';

import api from '~/services/api';

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [inputSearch, setInputSearch] = useState('');

  useEffect(() => {
    async function loadProblems() {
      try {
        const response = await api.get('problems', {
          params: {
            product: inputSearch,
          },
        });

        const data = response.data.map(problem => ({
          ...problem,
          visible: false,
          visualize: false,
        }));

        setProblems(data);
      } catch (err) {
        toast.error('Ocorreu um erro interno.');
      }
    }

    loadProblems();
  }, [inputSearch]);

  function handleToggle(id, visible, visualize) {
    setProblems(
      problems.map(problem =>
        problem.id === id ? { ...problem, visible, visualize } : problem
      )
    );
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/problems/${id}`);

      setProblems(problems.filter(problem => problem.id !== id));

      toast.success('Entregador excluido com sucesso.');
    } catch (err) {
      toast.error('Ocorreu um erro interno.');
    }
  }

  return (
    <>
      <h1>Gerenciando problemas</h1>

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
      </Actions>

      <Table>
        <thead>
          <tr>
            <th>Encomenda</th>
            <th>Problema</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {problems.map(problem => (
            <>
              <TableItem key={problem.id}>
                <td>#{problem.order.id}</td>
                <td>{problem.description}</td>
                <td>
                  <Badge
                    onClick={() => handleToggle(problem.id, !problem.visible)}
                  >
                    <FiMoreHorizontal color="#C6C6C6" size={16} />
                  </Badge>

                  <ActionList visible={problem.visible}>
                    <button
                      type="button"
                      onClick={() =>
                        handleToggle(
                          problem.id,
                          !problem.visible,
                          !problem.visualize
                        )
                      }
                    >
                      <FiEye color="#8E5BE8" size={16} />
                      Visualizar
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(problem.id)}
                    >
                      <FiTrash2 color="#DE3B3B" size={16} />
                      Excluir
                    </button>
                  </ActionList>
                </td>
              </TableItem>
              <Modal key={problem.id} visible={problem.visualize}>
                <div>
                  <header>
                    <strong>Visualizar problema</strong>
                    <button
                      type="button"
                      onClick={() =>
                        handleToggle(
                          problem.id,
                          problem.visible,
                          !problem.visualize
                        )
                      }
                    >
                      <FiArrowRight color="#ddd" size={20} />
                    </button>
                  </header>
                  <p>{problem.description}</p>
                </div>
              </Modal>
            </>
          ))}
        </tbody>
      </Table>
    </>
  );
}
