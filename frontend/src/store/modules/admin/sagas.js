import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { createFailure, createSuccess } from './actions';

export function* createDeliverymen({ payload }) {
  try {
    const { name, email, avatar_id } = payload;

    yield call(api.post, 'deliverymen', {
      name,
      email,
      avatar_id,
    });

    yield put(createSuccess());

    history.push('/deliverymen');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados!');

    yield put(createFailure());
  }
}

export function* createRecipient({ payload }) {
  try {
    const { name, street, city, uf, zipcode, complement, number } = payload;

    yield call(api.post, 'recipients', {
      name,
      street,
      city,
      uf,
      zipcode,
      complement,
      number,
    });

    yield put(createSuccess());

    history.push('/recipients');
  } catch (err) {
    console.tron.error(err);

    toast.error('Falha no cadastro, verifique seus dados!');

    yield put(createFailure());
  }
}

export function* createOrder({ payload }) {
  try {
    const { product, deliveryman_id, recipient_id } = payload;

    yield call(api.post, 'orders', {
      product,
      deliveryman_id,
      recipient_id,
    });

    yield put(createSuccess());

    history.push('/orders');
  } catch (err) {
    console.tron.error(err);

    toast.error('Falha no cadastro, verifique seus dados!');

    yield put(createFailure());
  }
}

export default all([
  takeLatest('@admin/CREATE_DELIVERYMEN_REQUEST', createDeliverymen),
  takeLatest('@admin/CREATE_RECIPIENT_REQUEST', createRecipient),
  takeLatest('@admin/CREATE_ORDER_REQUEST', createOrder),
]);
