export function createDeliverymenRequest(name, email, avatar_id) {
  return {
    type: '@admin/CREATE_DELIVERYMEN_REQUEST',
    payload: { name, email, avatar_id },
  };
}

export function updateDeliverymenRequest(id, name, email, avatar_id) {
  return {
    type: '@admin/UPDATE_DELIVERYMEN_REQUEST',
    payload: { id, name, email, avatar_id },
  };
}

export function createOrderRequest(product, deliveryman_id, recipient_id) {
  return {
    type: '@admin/CREATE_ORDER_REQUEST',
    payload: { recipient_id, deliveryman_id, product },
  };
}

export function updateOrderRequest(id, product, deliveryman_id, recipient_id) {
  return {
    type: '@admin/UPDATE_ORDER_REQUEST',
    payload: { id, recipient_id, deliveryman_id, product },
  };
}

export function createRecipientRequest({
  name,
  street,
  number,
  complement,
  city,
  uf,
  zipcode,
}) {
  return {
    type: '@admin/CREATE_RECIPIENT_REQUEST',
    payload: { name, street, number, complement, city, uf, zipcode },
  };
}

export function updateRecipientRequest({
  id,
  name,
  street,
  number,
  complement,
  city,
  uf,
  zipcode,
}) {
  return {
    type: '@admin/UPDATE_RECIPIENT_REQUEST',
    payload: { id, name, street, number, complement, city, uf, zipcode },
  };
}

export function createSuccess() {
  return {
    type: '@admin/CREATE_SUCCESS',
  };
}

export function createFailure() {
  return {
    type: '@admin/CREATE_FAILURE',
  };
}

export function updateSuccess() {
  return {
    type: '@admin/UPDATE_SUCCESS',
  };
}

export function updateFailure() {
  return {
    type: '@admin/UPDATE_FAILURE',
  };
}
