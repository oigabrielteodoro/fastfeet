export function createDeliverymenRequest(name, email, avatar_id) {
  return {
    type: '@admin/CREATE_DELIVERYMEN_REQUEST',
    payload: { name, email, avatar_id },
  };
}

export function createOrderRequest(product, deliveryman_id, recipient_id) {
  return {
    type: '@admin/CREATE_ORDER_REQUEST',
    payload: { recipient_id, deliveryman_id, product },
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
